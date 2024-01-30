

function main() {
  let clickCount = 0;
  document.addEventListener('DOMContentLoaded', () => {
    const secret = document.getElementsByClassName('secret');
    secret[0].addEventListener('click', () => {
      clickCount += 1;
      if (clickCount === 3) {
        secret[0].src='./public/images/mrfresh.png';
      }
      if (clickCount === 6)
        window.location.href = 'https://github.com/tomasblaer';
    });
  });
}

main();
