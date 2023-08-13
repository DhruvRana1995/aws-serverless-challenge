# AWS Serverless Code Challenge


Serverless IAC implementation code challenge along with NodeJs REST API on AWS Serverless Infra (Lambda, API Gw &amp; DynamoDB).)


# DynamoDB CRUD operation using AWS serverless Lambda and NodeJs

- CRUD operations using API Gateway, AWS lambda with DynamoDB and NodeJs.
- I created this API using AWS serverless application and NodeJs.

# Hosting node js API in AWS serverless lambda

Useful commands to start an AWS API lambda project and deployment

(01). For the npm command you have to install node.js on windows
	    https://nodejs.org/en/
	
(02). For serverless installation
	    
      npm install serverless --force -g

(03). Create a folder and move into it

	    mkdir test
	    cd test  
      
 or
      
      mkdir "folder name" && cd "folder name"
	
(04). Clone this repository here in the test directory.
	    
      git clone https://github.com/DhruvRana1995/aws-serverless-challenge.git
	
(05). Open the project using visual studio code
	    
      code .
	
(06). Create a packagejs module
	    
      npm init -t

(07). Install a module of A universally unique identifier (UUID)
	    
      npm install uuid
	
(08). Deploy the project
	    
      sls deploy

(09). Sometimes you have to provide the AWS access key and secret key before deploying the project

	    serverless config credentials --provider aws --key "Your AWS Access Key ID" --secret "Your AWS Secret Key ID"


The **loop video** recording has all the explanations for an end-to-end Automated Solution for a Serverless e-commerce backend REST CURD API Solution on the AWS Serverless Cloud Infra. Here is the loop video recording **uploaded on Google Drive** that can be accessed publically: https://drive.google.com/file/d/1W852sUvf50aLCUuR9IM9W4N45TPc5GGP/view?usp=sharing

