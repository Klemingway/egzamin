function zaokrongl(variable) {
    return Math.round(variable * 100) / 100;
}
document.addEventListener('mouseup', function(e) {
    if (e.target.id == "dwd") {
        zamknij();
    } else if (e.target.id == "dwd2") {
        zamknij1();
    }
});

function tableCreate2(splata, k, oprocentowanie, kwota, rata, prowizja, kwota_dodana) {
    console.log("kwota: " + kwota);
    //tu sie dzieje magia sztańska i wgl ale no uwu
    var a = document.getElementById("wyniki2");
    // czyszczenie diva
    a.innerHTML = '';
    //ustawiamy sobie stałą
    const wyniki = document.a,
        // do tej stałej tworzymy element div
        div = document.createElement('div');
    // ustawiamy id diva jako tabela
    div.setAttribute("id", "tabela");
    //tworzymy tabele
    tbl = document.createElement('table');
    // dopisujemy tabele do diva
    div.appendChild(tbl);
    tbl.style.width = '110px';
    tbl.style.border = '1px solid black';

    var odsetki = 0,
        suma_odsetek = 0,
        suma = 0;
    var kapital = 0,
        suma = 0,
        kwota_kredytu = 0;

    var element1 = document.getElementById('advanced2');
    var choice2 = document.getElementsByName('choice2');
    if (element1 !== null && choice2[1].checked == true) {
        kwota_kredytu = kwota - kwota_dodana;
        console.log("kwota+kredytu: " + kwota_kredytu)
    } else {
        kwota_kredytu = kwota;
        console.log("kwota+kredytu: " + kwota_kredytu)
    }
    // prosta pętla myśle że nic nie trzeba tłumaczyć
    loop1:
        for (let i = 0; i <= splata; i++) {
            const tr = tbl.insertRow();
            loop2:
                for (let j = 0; j < 4; j++) {
                    odsetki = (oprocentowanie / k) * kwota_kredytu;


                    kapital = rata - odsetki;
                    const td = tr.insertCell();
                    if (i == 0 && j == 0) {
                        td.appendChild(document.createTextNode("L.p."));
                        td.style.fontSize = '20px';
                    } else if (i == 0 && j == 1) {
                        td.appendChild(document.createTextNode("Odsetki"));
                        td.style.fontSize = '20px';
                    } else if (i == 0 && j == 2) {
                        td.appendChild(document.createTextNode("Kapitał"));
                        td.style.fontSize = '20px';
                    } else if (i == 0 && j == 3) {
                        td.appendChild(document.createTextNode("Wysokość raty"));
                        td.style.fontSize = '20px';
                    }
                    if (j == 0 && i != 0) {
                        if (kapital >= rata) {
                            break loop1;
                        }
                        td.appendChild(document.createTextNode(i));
                    } else if (j == 1 && i != 0) {
                        suma_odsetek += odsetki;
                        td.appendChild(document.createTextNode(zaokrongl(odsetki)));
                    } else if (j == 2 && i != 0) {
                        kwota_kredytu -= kapital;
                        td.appendChild(document.createTextNode(zaokrongl(kapital)));
                    } else if (j == 3 && i != 0) {
                        suma += rata;
                        td.appendChild(document.createTextNode(rata));
                    }
                    td.style.border = '1px solid black';

                }
        }
    console.log("Suma: " + suma)
    console.log("Suma odsetek: " + suma_odsetek)
    a.appendChild(div);
}

function obliczanie(I, N, oprocentowanie, choice, n, zaplata, prowizja, suma, k, kwota_dodana) {
    var choice2 = document.getElementsByName('choice2');

    // jeżeli wybrane żeby Prowizja wliczana w koszt kredytu to wtedy to się liczy
    if (choice[0].checked == true) {
        prowizja = (document.getElementById("prowiz").value) / 100;

        prowizja = prowizja * N;
        // doliczamy prowizję do kwoty kredytu
        N = N * 1 + prowizja;

        // jeżeli okres spłaty wynosi mniej niż 12 miesięcy to analogicznie w roku 
        // zapłacimy równowartość tego okresu bo w roku mamy max 12 rat
        k = 12;
        if (n < 12) {
            k = n;
        }
        for (var i = 1; i <= n; i++) {
            // no to tutaj przepisany wzór z matematycznego na kodowanie 
            suma += Math.pow((1 + (oprocentowanie / k)), -i);
        }
        // tutaj jest licznik podzielony przez mianownik
        I = N / suma;
        // mnożymy naszą ratę razy ilość rat aby otrzymać ile będziemy musieli oddać bankowi
        zaplata = I * n;
        console.log("N: " + N)

        tableCreate2(n, k, oprocentowanie, N, zaokrongl(I), prowizja, kwota_dodana)
        document.getElementById("wyniki").innerHTML = "Wysokość raty: " + zaokrongl(I) + "<br>" +
            "Całkowita kwota do spłaty: " + zaokrongl(zaplata);

        // jeżeli wybrane żeby Prowizja wliczana osobno to wtedy to się liczy
    } else if (choice[1].checked == true) {
        prowizja = (document.getElementById("prowiz").value) / 100;
        prowizja = prowizja * N;
        // jeżeli okres spłaty wynosi mniej niż 12 miesięcy to analogicznie w roku zapłacimy równowartość tego okresu bo w roku mamy max 12 rat
        k = 12;
        if (n < 12) {
            k = n;
        }
        for (var i = 1; i <= n; i++) {
            // no to tutaj przepisany wzór z matematycznego na kodowanie 
            suma += Math.pow((1 + (oprocentowanie / k)), -i);
        }
        // tutaj jest licznik podzielony przez mianownik
        I = N / suma;
        // mnożymy naszą ratę razy ilość rat aby otrzymać ile będziemy musieli oddać bankowi
        zaplata = I * n;
        // doliczamy prowizję po wszystkich obliczeniach
        zaplata = zaplata + prowizja;
        console.log("N: " + N)
        tableCreate2(n, k, oprocentowanie, N, zaokrongl(I), prowizja, kwota_dodana)
        document.getElementById("wyniki").innerHTML = "Wysokość raty: " + zaokrongl(I) + "<br>" +
            "Całkowita kwota do spłaty: " + zaokrongl(zaplata);
    } else {
        console.log("wda")
    }
    document.getElementById("dwd").style.backdropFilter = "blur(7px)";
    document.getElementById("wyniki").innerHTML += "<br><input type=\"button\" id='guzior1' onclick=\"pokaz()\" value=\"pokaż harmonogram rat\">";

}

function test() {
    var element = document.getElementById('advanced2');
    if (element != null) {
        document.getElementById("fo").style.position = "relative";
    }
    document.getElementById("wyniki").style.visibility = "visible"; // a to to nwm pan mularczyk robił
    var I, N, oprocentowanie, k, n, suma = 0,
        zaplata, prowizja = 0;

    N = document.getElementById("kwota").value; // kwota kredytu
    oprocentowanie = document.getElementById("oproc").value / 100; // oprocentowanie kredytu
    n = document.getElementById("splata").value; // okres splaty

    var choice = document.getElementsByName('choice');

    //////////////////////////////////////
    //                                  //
    // sprawdzenie czy jest rozwinięte  //
    //                                  //
    //////////////////////////////////////

    var element1 = document.getElementById('advanced2');
    var element2 = document.getElementById('advanced2');
    if (element1 !== null && element2 !== null) {
        var kwota_dodana = document.getElementById("kwotaDodana").value;
        var choice2 = document.getElementsByName('choice2'); // zaawansowane
        if (choice2[0].checked == true) {
            console.log(kwota_dodana + "  " + "tyle samo rat ale mniejsza cena")
                //////////////////////////////////////////
                //                                      //
                //    tyle samo rat ale mniejsza cena   //
                //                                      //
                //////////////////////////////////////////
            N -= kwota_dodana;
            console.log("Nigger: " + N)
            obliczanie(I, N, oprocentowanie, choice, n, zaplata, prowizja, suma, k, kwota_dodana);

        }
        if (choice2[1].checked == true) {
            console.log(kwota_dodana + "  " + "Mniej rat, po tej samej cenie raty")
                //////////////////////////////////////////
                //                                      //
                //  Mniej rat, po tej samej cenie raty  //
                //                                      //
                //////////////////////////////////////////


            obliczanie(I, N, oprocentowanie, choice, n, zaplata, prowizja, suma, k, kwota_dodana);
        }


    } else {
        obliczanie(I, N, oprocentowanie, choice, n, zaplata, prowizja, suma, k);
    }

}

function pokaz() {
    document.getElementById("dwd").style.visibility = "visible";
}

function zamknij() {
    document.getElementById("dwd").style.visibility = "hidden";
}

function pokaz1() {
    document.getElementById("dwd2").style.backdropFilter = "blur(7px)";
    document.getElementById("dwd2").style.visibility = "visible";
}

function zamknij1() {
    document.getElementById("dwd2").style.visibility = "hidden";
}

function zaawansowane() {
    var element = document.getElementById('advanced2');
    if (element === null) {
        var a = document.getElementById("tabelka");
        const wyniki = document.a,
            /////////////////////////////////////////
            //                                     //
            //          input text kwata           //
            //                                     //
            ///////////////////////////////////////// 
            trA = document.createElement('tr');
        trA.setAttribute("id", "advancedText");
        trA.setAttribute('style', 'position:relative; padding-top:200px; height:40px;')


        tdA = document.createElement('td');
        tdB = document.createElement('td');

        inputA = document.createElement('input');
        inputA.setAttribute('type', 'text');
        inputA.setAttribute('id', 'kwotaDodana');

        tdA.innerHTML += "Kwota dołożona";
        tdB.appendChild(inputA);
        trA.appendChild(tdA);
        trA.appendChild(tdB);
        a.appendChild(trA);

        tdA = document.createElement('td');
        tdB = document.createElement('td');

        inputA = document.createElement('input');
        inputA.setAttribute('type', 'text');
        inputA.setAttribute('id', 'ubezpieczenie');

        tdA.innerHTML += "Ubezpieczenie";
        tdB.appendChild(inputA);
        trA.appendChild(tdA);
        trA.appendChild(tdB);

        //a.appendChild(trB);
        a.appendChild(trA);

        /////////////////////////////////////////
        //                                     //
        //            inputy radio             //
        //                                     //
        /////////////////////////////////////////                                          

        tr2 = document.createElement('tr');
        tr2.setAttribute("id", "advanced2");
        td1 = document.createElement('td');
        td1.setAttribute("colspan", "2");
        td1.setAttribute('style', 'text-align:center;');
        //style="text-align: center;"
        br = document.createElement('br');

        label1 = document.createElement('label');
        input1 = document.createElement('input');
        input1.setAttribute('type', 'radio');
        input1.setAttribute('name', 'choice2');
        input1.setAttribute('class', 'radio');
        input1.setAttribute('value', 'rat_mniej');

        label1.appendChild(input1);
        label1.innerHTML += ' Raty pozostają takie same, ale mniej';

        td2 = document.createElement('td');
        td2.setAttribute("colspan", "2");
        td2.setAttribute('style', 'text-align:center;');
        label2 = document.createElement('label');
        input2 = document.createElement('input');
        input2.setAttribute('type', 'radio');
        input2.setAttribute('name', 'choice2');
        input2.setAttribute('class', 'radio');
        input2.setAttribute('value', 'rat_tyle_samo');


        label2.appendChild(input2);
        label2.innerHTML += ' Mniejsza rata na taki sam okres czasu';


        td1.appendChild(br);
        td1.appendChild(label1);

        td2.appendChild(br);
        td2.appendChild(label2);

        tr2.appendChild(td2);
        tr2.appendChild(td1);

        a.appendChild(tr2);

        clicked = false;
    } else {
        var elem = document.getElementById("advanced2");
        elem.parentNode.removeChild(elem);
        elem = document.getElementById("advancedText");
        elem.parentNode.removeChild(elem);
    }
}