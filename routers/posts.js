const express = require('express');
const router = express.Router();

// Importo la logica del controller
const postsController = require('../controllers/posts.js');


router.get('/', postsController.index);

router.get('/:slug', (req, res) => {
    const slugPost = req.params.slug;
    // find() restituisce true quando viene trovato il primo elemento
    // per il quale la funzione restituisce true
    const postWanted = posts.find(p => p.slug === slugPost);
    res.format({
        // Content negotiation
        html: () => {
            // Se il post richiesto viene trovato
            if(postWanted) {
                const p = postWanted;
                res.send(
                   `
                    <div>
                        <h2> ${p.title} </h2>
                        <img style="width: 200px" src="/${p.image}" alt="${p.title}"/>
                        <p> ${p.content} </p>
                        <p> Ingredienti: </p>
                   ${p.tags.map(t => `<span>${t}</span>`).join(', ')}
                           <hr>
                       </div>
                    </main>
                   `);
            } else {
                res.status(404).send(`<h1>Post non trovato</h1>`);
            }
        },
        json: () => {
            if(postWanted) {
                res.json({
                    ...postWanted,
                    image_url: `http://${req.headers.host}/${postWanted.image}`
                });
            } else {
                res.status(404).json({
                    error: 'Not Found',
                    description: `Non esiste un post con slug: ${slugPost}`
                });
            }
        }
    })
})

router.post('/create', (req, res) => {
    res.format({
        html: () => {
            res.send(`
            <main>
                <h1> Creazione nuovo Post </h1>
            </main>`);
        }
    })
})


module.exports = router