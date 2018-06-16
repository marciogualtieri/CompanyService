<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Company Service](#company-service)
  - [Overview](#overview)
  - [Dependencies](#dependencies)
  - [Running Tests](#running-tests)
  - [Code Coverage](#code-coverage)
  - [Continuous Integration](#continuous-integration)
  - [Running the App](#running-the-app)
    - [Listing All Companies](#listing-all-companies)
    - [Listing a Company](#listing-a-company)
    - [Adding a New Company](#adding-a-new-company)
    - [Updating a Company](#updating-a-company)
      - [Adding an Owner to a Company](#adding-an-owner-to-a-company)
    - [Deleting a Company](#deleting-a-company)
  - [Deployment to AWS](#deployment-to-aws)
    - [Service Redundancy for Fault Tolerance](#service-redundancy-for-fault-tolerance)
  - [Developer's Guide](#developers-guide)
    - [JPA Relationship Database](#jpa-relationship-database)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Company Service

## Overview

The purpose of this project is to showcase my back-end development skills with Spring MVC RestController and [Spring Boot](https://spring.io/projects/spring-boot).

The back-end consists of a JSON REST service which supports the following operations:

* POST a new company
* GET all companies
* GET a single company
* PUT (update) a company
* Add owner(s) to company

A company has the following JSON properties:

|Property   |Type   |Description            |
|-----------|-------|-----------------------|
|id         |numeric|Company ID             |
|name       |string |Name                   |
|address    |string |Address                |
|city       |string |City                   |
|country    |string |Country                |
|email      |string |E-mail (optional)      |
|phoneNumber|string |Phone Number (optional)|
|owners     |object |One or more owners     |

Each owner has the following JSON properties:

|Property   |Type   |Description|
|-----------|-------|-----------|
|id         |numeric|Owner ID   |
|name       |string |Name       |

## Dependencies

This app has been developed with Maven 3 and Java 8. At the moment this app uses H2 (in-memory) as the database, so there's no need to deploy a database (even for the AWS instance).
An actual database can be easily added by changing [`src/main/java/resources/application.properties`](src/main/java/resources/application.properties).

## Running Tests

Execute the following command from a terminal:

    mvn clean verify

Given that this service is a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) service, I'm opting for integration tests and at the present moment I don't see the necessity of unit tests.

The integration tests provide full coverage of behavioral testing.

I believe that unit tests would be more suitable for data processing code (which at the present moment is not required).

## Code Coverage

I have added the [JaCoCo plugin](http://www.eclemma.org/jacoco/trunk/doc/maven.html) to this project.

JaCoCo reports are generated automatically after tests are executed and can be found at `target/site/jacoco-it/index.html`.

## Continuous Integration

I'm using [CircleCI](https://circleci.com/) for this purpose.

You will find the CircleCI builds [here]().

## Running the App

To run the app in development mode, execute the following command from a terminal:

    mvn spring-boot:run

### Listing All Companies

    curl --request GET http://localhost:5000/companies

The app's database has been initialized with some companies already. You should get the following output:

    [{"id":1000,"name":"Dharma Initiative",
    "address":"815108 Membata Ave. Ann Arbor, MI","city":"Ann Arbor",
    "country":"United States","email":"contact@dharma.com",
    "phoneNumber":"481 516 2342","owners":[{"id":1001,\
    "name":"Gerald DeGroot"},{"id":1002,"name":"Karen DeGroot"}]},
    {"id":2000,"name":"InGen",
    "address":"4865 Trifolium Ave. Palo Alto, CA",
    "city":"Palo Alto","country":"United States",
    "email":"contact@ingen.com","phoneNumber":"632 362 3268",
    "owners":[{"id":2001,"name":"Dr. John Hammond"}]}]

### Listing a Company

You might get the details of a single company:

    curl --request GET http://localhost:5000/companies/1000

You should get the following output:

    {"id":1000,"name":"Dharma Initiative",
    "address":"815108 Membata Ave. Ann Arbor, MI",
    "city":"Ann Arbor","country":"United States",
    "email":"contact@dharma.com","phoneNumber":"481 516 2342",
    "owners":[{"id":1001,"name":"Gerald DeGroot"},
    {"id":1002,"name":"Karen DeGroot"}]}

### Adding a New Company

    curl --header "Content-Type: application/json"  --request POST \
    --data '{"name": "Wayne Industries",
    "address": "432 East Wacker St. Gotham City, NY",
    "city": "Gotham City","country": "United States",
    "email": "contact@wayne.com","phoneNumber": "748 362 3628",
    "owners":[{"name": "Bruce Wayne"}]}' \
    http://localhost:5000/companies

Adding a new company doesn't produce any output, but you will notice that a new company has been added if you list the companies once again:

    curl --request GET http://localhost:5000/companies

Which has the following output:

    [{"id":1,"name":"Wayne Industries",
    "address":"432 East Wacker St. Gotham City, NY",
    "city":"Gotham City","country":"United States",
    "email":"contact@wayne.com","phoneNumber":"748 362 3628",
    "owners":[{"id":2,"name":"Bruce Wayne"}]},
    {"id":1000,"name":"Dharma Initiative",
    "address":"815108 Membata Ave. Ann Arbor, MI",
    "city":"Ann Arbor","country":"United States",
    "email":"contact@dharma.com","phoneNumber":"481 516 2342",
    "owners":[{"id":1001,"name":"Gerald DeGroot"},
    {"id":1002,"name":"Karen DeGroot"}]},
    {"id":2000,"name":"InGen",
    "address":"4865 Trifolium Ave. Palo Alto, CA","city":"Palo Alto",
    "country":"United States","email":"contact@ingen.com",
    "phoneNumber":"632 362 3268","owners":[{"id":2001,
    "name":"Dr. John Hammond"}]}]

Note the new company at the beginning of the JSON string.

### Updating a Company

You may update the company you have created previously by executing the following command:

    curl --header "Content-Type: application/json" \
    --request PUT \
    --data '{"name": "Batman Industries",
    "address": "432 East Wacker St. Gotham City, NY",
    "city": "Gotham City","country": "United States",
    "email": "contact@wayne.com","phoneNumber": "748 362 3628",
    "owners":[{"name": "Bruce Wayne"}]}' \
    http://localhost:5000/companies/1

If you retrieve only this particular company:

    curl --request GET http://localhost:5000/companies/1

You will note that the company's name has changed to "Batman Industries":

    {"id":1,"name":"Batman Industries",
    "address":"432 East Wacker St. Gotham City, NY",
    "city":"Gotham City","country":"United States",
    "email":"contact@wayne.com","phoneNumber":"748 362 3628",
    "owners":[{"id":3,"name":"Bruce Wayne"}]}

#### Adding an Owner to a Company

I'm adding the (original) three stooges to the following company as owners:

    curl --header "Content-Type: application/json" --request POST \
    --data '[{"name": "Moe Howard"}, {"name": "Curly Howard"}, {"name": "Larry Fine"}]' \
    http://localhost:5000/companies/1000/owners

If you retrieve this particular company:

You will note three new knuckle heads, I mean, owners:

    {"id":1000,"name":"Dharma Initiative",
    "address":"815108 Membata Ave. Ann Arbor, MI",
    "city":"Ann Arbor","country":"United States",
    "email":"contact@dharma.com","phoneNumber":"481 516 2342",
    "owners":[{"id":6,"name":"Larry Fine"},
    {"id":1002,"name":"Karen DeGroot"},
    {"id":4,"name":"Moe Howard"},
    {"id":5,"name":"Curly Howard"},
    {"id":1001,"name":"Gerald DeGroot"}]}

### Deleting a Company

    curl --request DELETE http://localhost:5000/companies/1000

No output for deleting a company, but if you retrieve this particular company:

    {"timestamp":"2018-06-16T16:57:42.768+0000","status":500,
    "error":"Internal Server Error",
    "message":"No class com.llibaiv.company.service.entities.Company
    entity with id 1000 exists!",
    "path":"/companies/1000"}

The company no longer exists.

## Deployment to AWS

Install the AWS EB CLI following [these instructions](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html).

Execute the following command to create the deployment configuration:

    eb init

Build your code for deployment:

    mvn clean install

Create a single instance environment on AWS:

    eb create -s

I'm using a single instance because I'm cheap. Plus, Jeff Bezos is already filthy rich.

If you have made any changes and wish to re-deploy:

    eb deploy

To find out the URL of your service, open the AWS console:

    eb console

After the deployment is complete, you should be able to access the deployed service from AWS:

    curl --request GET http://companyservice-dev.eu-west-1.elasticbeanstalk.com/companies

### Service Redundancy for Fault Tolerance

Redundancy can be achieved in EC2 with availability zones (AZs). AZs are divided by region. AZs in different regions are independently powered and have network and security of their own. Thus, they are insulated from the failures of other zones and provide redundancy.

That will significantly reduce the chance of total outage or failure, but note that bandwidth across zone boundaries will cost you some extra money.

Another important factor to consider is the database choice. This particular app hasn't been configured with a production database. Whatever your choice for production, it should support high-availability also.

Note that AWS makes available a plethora of [cloud databases](https://aws.amazon.com/products/databases/).

## Developer's Guide

### JPA Relationship Database

For my own future reference, [this resource](https://en.wikibooks.org/wiki/Java_Persistence/OneToMany) was very useful for defining a relationship in JPA.