# AlgoAvancé

##Depth First Search (DFS) version itérative ​(parcours en profondeur d’abord)
*  https://www.hackerearth.com/practice/algorithms/graphs/depth-first-searc h/tutorial/ 


//Pseudo Code
/*
Je suis sur la case n° X , je stock cette case
Puis je allé en bas ?
si oui,je vais en bas et si non
Puis je allé à droite ?
si oui je vais à droite si non
Puis je allé en haut ?
si oui je vais en haut si non
Puis je allé à gauche ?
si oui je vais à gauche
 */


// psuedo code du sujet
/*
DFS-iterative est une fonction ( le labyrinthe, sommet de départ) {
creer une stack (un array) const S = [];
pusher s dans S et marqué s visité isVisited = true dans le les data du labyrinthe

    while( S is not empty ){
        pop , prend le dernier élément mi , donc il prend s et le stock dans V

            cherche tous les voisins accessible {
             si voisin pas visiter le mettre dans la stack
             et le passer a visiter voir si je suis arrivé si pas arrivé continué
            }

    }
}
*/