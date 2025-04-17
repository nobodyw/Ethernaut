Pour débloquer le contrat il faut pouvoir appeler la fonction unlock avec _key qui représente le bytes16 de la seconde valeur de data.

Pour pouvoir récupéré cette valeur il faut passer par la mémoire de stockage.

Définition et explication du stockage.
Pour rappel un emplacement complet de mémoire en solidity est égal a 32 bytes.
tous les ensembles de bytes formant 32 bytes sont concaténé en mémoire.
Deux nombre hexadécimaux = 1 bytes.


- bool public locked = true -> 1 bytes. getStorageAt(0 (1/32))
- uint256 public ID = block.timestamp -> 32 bytes. getStorageAt(1 full)
- uint8 private flattening = 10 -> 1 bytes. getStorageAt(2 1/32)
- uint8 private denomination = 255 -> 1 bytes. getStorageAt(2 2/32)
- uint16 private awkwardness = uint16(block.timestamp) -> 2 bytes. getStorageAt(2 4/32)
- bytes32[3] private data -> 32 bytes * 3. getStorageAt(3,4,5)

le bytes16(data[2]) est donc sauvegarder a l'emplacement 4, car c'est le 2 eme element du tableau data.
Il faut ensuite parser le bytes32 en bytes16, sachant que bytes32 est égal a 66 digits il faut reprendre les 34 premiers digits pour pouvoir le transformer en bytes16. (attention grosse perte de données dans cette exemple !!!)
