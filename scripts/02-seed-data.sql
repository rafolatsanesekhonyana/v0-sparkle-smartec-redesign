-- Insert default services
INSERT INTO services (name, description, duration, price) VALUES
('Basic Manicure', 'Nail shaping, cuticle care, and regular polish', 45, 35.00),
('Gel Manicure', 'Long-lasting gel polish with nail care', 60, 50.00),
('Basic Pedicure', 'Foot soak, nail care, and regular polish', 60, 45.00),
('Spa Pedicure', 'Luxury foot treatment with exfoliation and massage', 90, 65.00),
('Nail Art Design', 'Custom nail art and decorative designs', 30, 25.00),
('Full Set Acrylics', 'Complete acrylic nail extension set', 120, 80.00),
('Acrylic Fill', 'Acrylic nail maintenance and fill', 90, 60.00)
ON CONFLICT DO NOTHING;

-- Insert sample bookings for demonstration
INSERT INTO bookings (client_name, client_email, client_phone, service_id, booking_date, booking_time, status, notes) 
SELECT 
  'Thabo Mokoena',
  'thabo@example.com',
  '+266 62 345 678',
  s.id,
  CURRENT_DATE,
  '10:00',
  'confirmed',
  'Prefers light pink colors'
FROM services s WHERE s.name = 'Gel Manicure'
ON CONFLICT DO NOTHING;

INSERT INTO bookings (client_name, client_email, client_phone, service_id, booking_date, booking_time, status, notes) 
SELECT 
  'Nomsa Lebesa',
  'nomsa@example.com',
  '+266 63 765 432',
  s.id,
  CURRENT_DATE + INTERVAL '1 day',
  '14:30',
  'pending',
  'First time client, needs consultation'
FROM services s WHERE s.name = 'Spa Pedicure'
ON CONFLICT DO NOTHING;
