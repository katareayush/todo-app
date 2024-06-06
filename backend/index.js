const express = require ('express')
const app = express();
const {createTodo, updateTodo} = require('./types');
const { todo } = require('./db');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));

app.post('/todo', async function(req,res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(411).json({msg : " You sent wrong inputs"
        })
        return;
    }

    //put in mongo db
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    }) // to avoid error ( generally db are not down )

    res.json({
        msg : "Todo created successfully"
    })
})

app.get('/todos', async function(req,res){
    const todos = await todo.find({});
    res.json(todos); //promise 
})

app.put('/completed' , async function(req,res){ 
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if(!parsedPayload.success){
        res.status(411).json({msg : "You sent wrong inputs"
        })
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    },{
        completed : true
    })

    res.json({
        msg : "Todo marked as completed"
    })

})

app.listen(3000);