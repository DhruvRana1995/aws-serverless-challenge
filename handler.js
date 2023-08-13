'use strict';
const AWS = require('aws-sdk');
const order_table = new AWS.DynamoDB.DocumentClient();
const tableName =  process.env.ECOMMERCE_TABLE;

function response(status, message)
{
  return {
    statusCode : status,
    body: JSON.stringify(message)
  };
}

function sortbyCreatedDate(item1, item2)
{
  if(item1.CreateAt > item2.CreateAt)
    return -1;
  else
    return 1;
}

module.exports.createOrder = (event, context, callback) => {
  
  const { UserName, OrderNo, Email, Address } = JSON.parse(event.body);
  if(!UserName || UserName.trim() == "" || !OrderNo || OrderNo.trim() == "")
  {
    return callback(null, {
      statusCode : 404,
      body : "UserName and OrderNo are required"
    });
  }
  const orderLine = {
    UserName : UserName,
    OrderNo : OrderNo,
    Email : Email,
    CreateAt : new Date().toISOString(),
    Address : Address
  };

  return order_table.put({
    TableName : tableName,
    Item : orderLine
  }).promise()
  .then((res) => {
    callback(null, response(201, orderLine));
  })
  .catch((err) => {
    callback(null, response(err.StatusCode, err));
  });
};

module.exports.getOrders = (events, context, callback) => {
  const query = {
    TableName : tableName
  };


  return order_table.scan(query).promise()
  .then((res) => {
    callback(null, response(200, res.Items.sort(sortbyCreatedDate)));
  })
  .catch((err) => {
    callback(null,response(err.StatusCode, err));
  });
};

module.exports.getOrderByOrderNo = (event, context, callback) => {
  var order_no = event.pathParameters.orderno;
  if(!order_no || order_no.trim() === "")
  {
    return callback(null, response(400, "{orderno} cannot be null when filtering orders by date"));
  }
  const filter_query = {
    TableName : tableName,
    IndexName : "OrderNo_Index",
    KeyConditionExpression : "#order_no = :order_no",
    ProjectionAttributes : "OrderNo, UserName",
    ExpressionAttributeNames:
    {
      "#order_no" : "OrderNo"
    },
    ExpressionAttributeValues:
    {
       ":order_no" : order_no
    }
  };

  return order_table.query(filter_query).promise()
  .then((res) => {
    callback(null, response(200, res.Items));
  })
  .catch((err) => {
    callback(null, response(err.StatusCode, err));
  })
};

module.exports.updateItem = (inputevent, context, callbackMage) => {
  var order_no = inputevent.pathParameters.orderno;
  const {UserName, Email, Address, CreateAt}  = JSON.parse(inputevent.body);
  var query = {
    TableName : tableName,
    UpdateExpression : "SET Email = :email, Address = :address, CreateAt = :createat",
    Key : {
      OrderNo : order_no,
      UserName : UserName
    },
    ExpressionAttributeValues : {
      ":email" : Email,
      ":address" : Address,
      ":createat" : CreateAt
    },
    ReturnValues : "ALL_NEW"
  }

  return order_table.update(query).promise()
  .then((res) => {
    callbackMage(null, response(200, res.Attributes));
  })
  .catch((err) => {
    callbackMage(null, response(err.StatusCode, err));
  })
}

module.exports.deleteItem = (event, context, callback) => {
  var username = event.pathParameters.username;
  const { OrderNo } = JSON.parse(event.body);
  var query = {
    TableName : tableName,
    Key : {
      UserName : username,
      OrderNo : OrderNo
    },
    ReturnValues : "ALL_OLD"
  };

  return order_table.delete(query).promise()
  .then((res) => {
    callback(null, response(200, res.Attributes));
  })
  .catch((err) => {
    callback(null, response(err.StatusCode, err));
  });
};
