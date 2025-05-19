-- Criação das tabelas para o Cardápio Digital

-- Tabela de categorias
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de produtos
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de pedidos
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de itens de pedido
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Índices para melhorar a performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_settings_key ON public.settings(key);

-- RLS (Row Level Security)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Políticas para categorias
CREATE POLICY "Permitir leitura pública de categorias" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Permitir insert/update/delete de categorias para autenticados" ON public.categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para produtos
CREATE POLICY "Permitir leitura pública de produtos" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Permitir insert/update/delete de produtos para autenticados" ON public.products
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para pedidos
CREATE POLICY "Permitir leitura de pedidos para autenticados" ON public.orders
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Permitir insert de pedidos para todos" ON public.orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir update/delete de pedidos para autenticados" ON public.orders
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para itens de pedido
CREATE POLICY "Permitir leitura de itens de pedido para autenticados" ON public.order_items
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Permitir insert de itens de pedido para todos" ON public.order_items
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir update/delete de itens de pedido para autenticados" ON public.order_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Políticas para configurações
CREATE POLICY "Permitir leitura pública de configurações" ON public.settings
    FOR SELECT USING (true);

CREATE POLICY "Permitir insert/update/delete de configurações para autenticados" ON public.settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar o campo updated_at
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Função de busca para produtos (vai permitir pesquisar produtos por nome ou descrição)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE OR REPLACE FUNCTION search_products(search_term TEXT)
RETURNS SETOF public.products AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.products
    WHERE name ILIKE '%' || search_term || '%'
    OR description ILIKE '%' || search_term || '%'
    ORDER BY name;
END;
$$ LANGUAGE plpgsql;
