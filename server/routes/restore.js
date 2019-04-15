const { Router } = require("express");

const TrashedPageModel = require("../models/trashedPage");
const TrashedPostModel = require("../models/trashedPost");
const TrashedMenuModel = require("../models/trashedMenu");
const PostModel = require("../models/post");
const PageModel = require("../models/page");
const MenuModel = require("../models/menu");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post('/post/:id', async (req, res) => {
    try {
        
    let {id} = req.params;

    let TrashPost= new TrashedPostModel();

    let post = await TrashPost.getTrashPostbyid(id);

    let restoredPost = {
        title: post.title,
        content: post.content,
        author: post.author,
        createdBy: post.createdBy,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }

    let Post = new PostModel();
    await Post.create(restoredPost);

    let result =await TrashPost.delete(id);

    console.log("successfully restored!!");
    res.send("successfully restored!!");
    } catch (e) {
        console.log(e);
        res.send("error");
    }

});

router.post('/page/:id', async(req, res) => {

    try {
        
        let {id} = req.params;
    
        let TrashPage = new TrashedPageModel();
    
        let page = await TrashPage.getTrashedPageById(id);
    
        let restoredPage = {
            title: page.title,
            content: page.content,
            author: page.author,
            createdBy: page.createdBy,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
            menuName: page.menuName
        }
        
        let Page = new PageModel();
        await Page.create(restoredPage);
    
        let result =await TrashPage.delete(id);
    
        console.log("successfully restored!!");
        res.send("successfully restored!!");
        } catch (e) {
            console.log(e);
            res.send("error");
        }
    
});

router.post('/menu/:menuName', async(req, res) => {

    try {
        
        let {menuName} = req.params;
    
        let TrashMenu = new TrashedMenuModel();
    
        let menu = await TrashMenu.getTrashedMenuMenuName(menuName);
    
        let restoredMenu = {
            menuName: menu.menuName,
            underMenu: menu.underMenu,
            linkedTo: menu.linkedTo,
            createdBy: menu.createdBy,
            createdAt: menu.createdAt,
            updatedAt: menu.updatedAt
        }
        
        let Menu = new MenuModel();
        await Menu.create(restoredMenu);
    
        let result =await TrashMenu.delete(menu._id);
    
        console.log("successfully restored!!");
        res.send("successfully restored!!");
        } catch (e) {
            console.log(e);
            res.send("error");
        }
    
});

module.exports = router;
