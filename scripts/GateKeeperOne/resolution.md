Passer le modifier gateOne
- il suffit d'appeler le smart contract depuis un autre smart contract.

Passer le modifier gateTwo
- calculer et envoyer le nombre exact de gas qui permet l'exécution de la fonction enter et avec un gas restant de 8191

Passer le modifier gateThree
- envoyer un bytes8 spécifique à la fonction enter
- les 2 derniers bytes doivent représenter tx.origin sous forme de uint160 (bytes20)
- une valeur doit exister dans les 4 premiers bytes