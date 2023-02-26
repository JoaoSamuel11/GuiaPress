const express = require("express");
const router = express.Router();
const Article = require("./Article");
const Category = require("../categories/Category");
const slugify = require("slugify");

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("./admin/articles/new", {categories: categories});
    })
});

router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        include:[{model: Category, required: true}]
    }).then(articles =>{
        res.render("./admin/articles/index", {articles: articles});
    });
});

router.post("/articles/save", (req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    if(title != undefined){
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(()=>{
            res.redirect("/admin/articles");
        })
    }else{
        res.redirect("/admin/articles/new");
    }
});

module.exports = router;