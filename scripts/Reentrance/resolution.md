Une simple attaque de reentrance dans la fonction withdraw.
Il faudrait que la modification de la valeur (-= _amount) se fasse avant l'envoi d'ether (via .call dans cette exemple)