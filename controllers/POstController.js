import PostModal from "../modals/Post.js" 

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModal.find().limit(5).exec()
       
        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0,5)


        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'Не удалось  получить  статью'
        })
    }
}

export const create = async(req, res) => {
    try {
        const doc = new PostModal({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user:req.userId
        })

        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'Не удалось создать  статью '
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const posts = await PostModal.find().populate('user').exec()
       
        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'Не удалось  получить  статью'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModal.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 },
        },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        massage: 'Не удалось vernucn  создать статью'
                    })
                }
            
                if (!doc) {
                    return res.status(404).json({
                        massage: 'Ствтья не найдена'
                    })
                }

                res.json(doc)

            }
        ).populate('user')
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'Не удалось получить статьи'
        })
   }
}


export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        
        PostModal.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    massage: 'Не удалось удалить статьи'
                })
            }

          
        if (!doc) {
            return res.status(404).json({
                  massage: 'Статья не нашлась'
              }) 
            }
            
            res.json({
                success: true
            })
        })
       
         
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'Не удалось получить статьи'
        })
   }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        
        await PostModal.updateOne({
            _id: postId,
        },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(',')
            },
        )
        res.json({
            success:true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'Не удалось обновить  статью'
        })
    }
}