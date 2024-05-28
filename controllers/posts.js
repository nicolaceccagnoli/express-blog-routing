let posts = require('../db/posts.json');
const { path } = require('../utils');


// Funzione per l'index
const index = (req, res) => {

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

};


// Funzione per lo show
const show = (req, res) => {

    // Dalla request prendo il parametro dello slug
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
                    // Nel JSON mando un oggetto con il post richiesto
                    ...postWanted,
                    // E l'url dell'immagine del post
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

}


// Funzione per il create
const create = (req, res) => {
    res.send(`
    <main>
        <h1> Creazione nuovo Post </h1>
    </main>`
    );
}


module.exports = {
    index, 
    show,
    create
}