### Step 1
Create your S3 bucket [here](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html). 

### Step 2
-  Go to : <i>IAM console</i><br/>
-  From the navigation menu, click <i>Users</i><br/>
-  Select your user or create a new user<br/>
-  Create an access key<br/>
-  Get te <i>Key ID</i> and the <i>Key secret</i><br/>

### Step 3
- Add all permissions to your user (or at least `AmazonS3FullAccess`)<br/>
- IAM > Create autorisation > S3<br/>

### Step 4 
Add the CORS policy in s3 > autorisations<br/>
<pre>
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
</pre>

### Step 5
Authorize public access to your s3 bucket

### Step 6
Add following code in `./backend/src/environments/environment.[dev|staging|prod]`:<br/>
<pre>
s3: {
        url: "https://[bucket].s3.eu-west-3.amazonaws.com/userUploads",
        bucket: "[bucket]",
        region: "[region]",
        host: "s3.eu-west-3.amazonaws.com",
        accessKeyId: "XXXXXXXXXXXXXXXXXX",
        secretAccessKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
</pre>

### Step 7
`cd backend`<br/>
`npm install aws-sdk@2.799.0`<br/>

### Step 8
Add the s3 folder (see download code) in your `./backend/src/api`

### Step 9
Add the `S3Module` in import section in your `app.module.ts`

### Step 10
Add `s3.utils.ts` in your `./frontend/src/utils`

### Step 11
Add `s3.service.ts` in your `./frontend/src/services`

### Step 12
Add `example.screen.ts` in your `./frontend/src/pages`<br/>
Add the page in `page.navigation.tsx`:<br/>
```
<Route exact path="/example" component={ExampleScreen} />
```

### Step 13
Launch the project with `docker-compose up -V --build`<br/>
That's it ! :rocket:
