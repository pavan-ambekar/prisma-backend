const prisma = require('../prisma/index');

//create a new post

exports.createPost = async (req, res, next) => {
  try {
    const { title, body, slug, authorId } = req.body;
    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const result = await prisma.post.update({
      where: { id },
      data: {
        title,
        body,
      },
    });
    res.json(result);
  } catch (error) {
    res.json({ error: `Post with ${id} does not exists` });
  }
};

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await prisma.post.delete({
      where: { id },
    });
    res.json(result);
  } catch (error) {
    res.json({ error: `Post with ${id} does not exists` });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (error) {
    res.json({ error: `No post was found` });
  }
};
