delete from owner;

delete from company;

insert into company(company_id, name, address, city, country, email, phone_number)
values(1000,'Dharma Initiative', '815108 Membata Ave. Ann Arbor, MI', 'Ann Arbor', 'United States',
'contact@dharma.com', '481 516 2342');

insert into company(company_id, name, address, city, country, email, phone_number)
values(2000,'InGen', '4865 Trifolium Ave. Palo Alto, CA', 'Palo Alto', 'United States', 'contact@ingen.com',
'632 362 3268');

insert into company(company_id, name, address, city, country, email, phone_number)
values(3000,'Valve Corporation', 'PO BOX 1688 Bellevue, WA 98009', 'Bellevue', 'United States', 'contact@valve.com',
'425 889 9642');

insert into company(company_id, name, address, city, country, email, phone_number)
values(4000,'Umbrella Corporation', 'Unknown', 'Racoon City', 'United States', 'contact@umbrella.com',
'555 555 0123');

insert into company(company_id, name, address, city, country, email, phone_number)
values(5000,'Acme Corp.', '3400 Warner Blvd, Burbank, CA 91505', 'Burbank', 'United States', 'contact@acme.com',
'555 555 4567');


insert into company(company_id, name, address, city, country, email, phone_number)
values(6000,'Omni Consumer Products', 'Unknown', 'Detroit', 'United States', 'contact@ocp.com',
'555 555 7890');

insert into owner(owner_id, name, company_id) values(1001,'Gerald DeGroot', 1000);

insert into owner(owner_id, name, company_id) values(1002,'Karen DeGroot', 1000);

insert into owner(owner_id, name, company_id) values(2001,'Dr. John Hammond', 2000);

insert into owner(owner_id, name, company_id) values(3001,'Gabe Newell', 3000);

insert into owner(owner_id, name, company_id) values(3002,'Mike Harrington', 3000);

insert into owner(owner_id, name, company_id) values(4001,'Oswell E. Spencer', 4000);

insert into owner(owner_id, name, company_id) values(5001,' Mr. Chairman', 5000);

insert into owner(owner_id, name, company_id) values(6001,'Public Company', 6000);
