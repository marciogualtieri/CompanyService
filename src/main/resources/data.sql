delete from owner;

delete from company;

insert into company(company_id, name, address, city, country, email, phone_number)
values(1000,'Dharma Initiative', '815108 Membata Ave. Ann Arbor, MI', 'Ann Arbor', 'United States',
'contact@dharma.com', '481 516 2342');

insert into company(company_id, name, address, city, country, email, phone_number)
values(2000,'InGen', '4865 Trifolium Ave. Palo Alto, CA', 'Palo Alto', 'United States', 'contact@ingen.com',
'632 362 3268');

insert into owner(owner_id, name, company_id) values(1001,'Gerald DeGroot', 1000);

insert into owner(owner_id, name, company_id) values(1002,'Karen DeGroot', 1000);

insert into owner(owner_id, name, company_id) values(2001,'Dr. John Hammond', 2000);
