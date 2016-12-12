/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function callFooter() {
	document.write('<footer class=\"page-footer\">');
	document.write('<div class=\"container\">');
	document.write('<div class=\"row\">');
	document.write('<div class=\"col s12 l6\">');
	document.write('<p class=\"grey-text text-lighten-4\">La aplicacion de subastas mas grande de la red</p>');
	document.write('</div>');
	document.write('<ul class=\"col s6 l3\">');
	document.write('<li><i class=\"material-icons\">question_answer</i><a href=\"mailto:soporte@vibbay.es\"> soporte@vibbay.es</a></li>');
	document.write('<br>');
	document.write('<li><i class=\"material-icons\">code</i> gitLab</li>');
	document.write('</ul>');
	document.write('<ul class=\"col s6 l3\">');
	document.write('<li><i class=\"material-icons\">contacts</i> contacto</li>');
	document.write('<br>');
	document.write('<li><i class=\"material-icons\">grade</i> premios</li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</div>');
	document.write('<div class=\"footer-copyright\">');
	document.write('<div class=\"container\">© 2016/2017 ADSI - UPV/EHU </div> </div> </footer>');
}

/* Inserta en la página el NavBar correspondiente */
function callNavBar() {
    document.write('<nav>');
    document.write('<div class=\"nav-wrapper\">');
    document.write('<a href=\"#!\" class=\"brand-logo\">VibBay</a>');
    document.write('<a href=\"#\" data-activates=\"mobile-demo\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>');
    document.write('<ul class=\"right hide-on-med-and-down\">');
    document.write('<li><a id="NavInicio" class=\"waves-effect waves-light btn\">Inicio</a></li>');
    document.write('</ul>');
    document.write('<ul class=\"side-nav\" id=\"mobile-demo\">');
    document.write('<li><a href=\"#!\">Sass</a></li>');
    document.write('<li><a href=\"#!\">Components</a></li>');
    document.write('<li><a href=\"#!\">Javascript</a></li>');
    document.write('<li><a href=\"#!\">Mobile</a></li>');
    document.write('</ul>');
    document.write('</div>');
    document.write('</nav>');
}
