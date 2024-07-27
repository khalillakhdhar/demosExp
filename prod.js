const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Tableau en mémoire pour stocker les produits
let products = [

    {
        titre:"p1",
        price:30,
        quantity:20
    },
    {
        titre:"p2",
        price:100,
        quantity:1
    }
];

// Route pour ajouter un produit
app.post('/products', (req, res) => {
  const { title, price, quantity } = req.body;
  products.push({ title, price, quantity });
  res.status(201).send('Produit ajouté');
});

// Route pour afficher tous les produits
app.get('/products', (req, res) => {
  res.json(products);
});

// Route pour supprimer un produit par titre
app.delete('/products/:title', (req, res) => {
  const { title } = req.params;
  products = products.filter(product => product.title !== title);
  res.send('Produit supprimé');
});

// Route pour modifier un produit par titre
app.put('/products/:title', (req, res) => {
  const { title } = req.params;
  const { price, quantity } = req.body;
  const product = products.find(product => product.title === title);
  if (product) {
    product.price = price;
    product.quantity = quantity;
    res.send('Produit modifié');
  } else {
    res.status(404).send('Produit non trouvé');
  }
});

// Route pour calculer le prix total des articles
app.get('/total-price', (req, res) => {
  const totalPrix = products.reduce((totale, product) => totale + (product.price * product.quantity), 0);
  // reduce((initialisation,element de parcours)=>initialisation+ (calcule),valeur initiale)
  res.json({ totalPrix });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
