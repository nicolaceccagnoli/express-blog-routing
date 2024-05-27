const { path } = require('../utils');
const express = require('express');

const router = express.Router();
let posts = require('../db/posts.json');

router.get('/', (req, res) => {

    // Content negotiation
    res.format({
        html: () => {
            let html = '<main>';
                posts.forEach( p => {
                    html += `
                        <div>
                            <h2> ${p.title} </h2>
                            <img style="width: 200px" src="/${p.image}" alt="${p.title}"/>
                            <p> ${p.content} </p>
                            <h6> Ingredienti </h6>
                            <ul>
                    `;
                    p.tags.forEach(t => html += `<li>${t}</li>`);
                    html += `
                            </ul>
                            <hr>
                        </div>
                    `;
                });
                html += `</main>`;
                // Inserisco nella risposta l'html
                res.send(html);
            },
            json: () => {
                res.json({
                    data: posts,
                    count: posts.length
                })
            }
    });
});


module.exports = router