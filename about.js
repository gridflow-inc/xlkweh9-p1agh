  document.addEventListener('DOMContentLoaded', function () {
    var founders = document.querySelectorAll('.founder');
    var cfmodal = document.getElementById('cfmodal');
    var cfclose = document.querySelector('.cfclose');

    founders.forEach(function (founder) {
      founder.addEventListener('click', function () {
        var founderName = founder.querySelector('h2').innerText;
        var founderPosition = founder.querySelector('h3').innerText;
        var founderDescription = founder.querySelector('.founder-info').innerText;

        cfmodal.querySelector('.founder-name').innerText = founderName;
        cfmodal.querySelector('.founder-position').innerText = founderPosition;
        cfmodal.querySelector('.founder-description').innerText = founderDescription;

        cfmodal.style.display = 'block';
      });
    });

    cfclose.addEventListener('click', function () {
      cfmodal.style.display = 'none';
    });

    window.onclick = function (event) {
      if (event.target == cfmodal) {
        cfmodal.style.display = 'none';
      }
    };
  });
