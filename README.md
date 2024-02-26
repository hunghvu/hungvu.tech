# Blogfolio @hungvu.tech


## Main services


This monorepo currently contains 2 core services: `cms` (front end), and `web` (back end).


**About `cms`**


Powered by:


- PayloadCMS: A configuration as code content management system.
- Express.js: A web application framework utilized by PayloadCMS.
- React: A front-end library for the admin dashboard.
- MongoDB: A document database utilized by PayloadCMS.
- Bree: A job scheduler for repetitive tasks (CronJobs).


**About `web`**


Powered by:


- Next.js: A React meta-framework.
- PrimeReact: Battery-powered component library, mainly used for its JS functionalities.
- Tailwind: A utility CSS library, for styling purposes, and can be integrated with PrimeReact.


## Infrastructure


The website [hungvu.tech](https://hungvu.tech) is hosted on the following platforms:


- Amazon Web Service (AWS): An EC2 instance (EC2 t4g.micro, ARM x64) is used for `cms`, `web`, and reverse proxy.
- Cloudflare: The domain, object storage (R2), DNS, firewall, and caching are handled here.
- MongoDB Atlas: A managed database solution for the `cms`.


Also:


- Docker: To containerize all services
- Caddy (also containerized): A reverse proxy to handle all traffic.
- Pulumi: An infrastructure as code service to config all mentioned platforms.


## Environment variables


All environment variables of `web` are configured in its Dockerfile. Meanwhile, the `cms` requires the following environment variables:


Database:


- PAYLOAD_MONGODB_DBNAME
- PAYLOAD_MONGODB_URI


Payload service:


- PAYLOAD_BACK_END_DOMAIN
- PAYLOAD_FRONT_END_DOMAIN
- PAYLOAD_PORT
- PAYLOAD_PUBLIC_SERVER_URL
- PAYLOAD_SECRET


S3 service (Cloudflare R2 in this case):


- PAYLOAD_S3_ACCESS_KEY_ID
- PAYLOAD_S3_BUCKET
- PAYLOAD_S3_ENDPOINT
- PAYLOAD_S3_REGION
- PAYLOAD_S3_SECRET_ACCESS_KEY


# How to run


1. Clone the repository.
2. Create an `env.production.local` at the same location as the `docker-compose.yml` file.
3. Fill out the environment file, and alter the variables accordingly in Dockerfile, and `docker-compose.yml`.
4. Create an external Docker network with `docker network create blogfolio`.
5. Use `docker-compose up -d --build` to build and run the containers.


## Author


Hung Vu:


 - LinkedIn: https://www.linkedin.com/in/hunghvu/
 - GitHub: https://github.com/hunghvu


## License


Copyright &copy; 2024 Huu Hung Vu, All Rights Reserved.