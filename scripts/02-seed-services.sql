-- Insert default nail services
INSERT INTO services (name, description, duration, price) VALUES
('Classic Manicure', 'Basic nail care with polish application', 45, 25.00),
('Gel Manicure', 'Long-lasting gel polish manicure', 60, 35.00),
('Classic Pedicure', 'Relaxing foot care with polish', 60, 30.00),
('Gel Pedicure', 'Long-lasting gel polish pedicure', 75, 40.00),
('Nail Art', 'Custom nail art design', 90, 50.00),
('French Manicure', 'Classic French tip manicure', 50, 30.00),
('Acrylic Extensions', 'Full set of acrylic nail extensions', 120, 60.00),
('Gel Extensions', 'Natural-looking gel nail extensions', 120, 65.00),
('Nail Repair', 'Fix broken or damaged nails', 30, 15.00),
('Express Manicure', 'Quick nail care and polish', 30, 20.00)
ON CONFLICT DO NOTHING;
