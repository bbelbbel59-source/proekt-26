const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const nav = $('#nav');
const totop = $('#totop');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 30);
  totop.classList.toggle('show', scrollY > 600);
});

totop.onclick = () => {
  scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

$('#burger').onclick = () => {
  $('#links').classList.toggle('open');
};

$$('#links a').forEach(a => {
  a.onclick = () => {
    $('#links').classList.remove('open');
  };
});

const heroText = $('#heroText');

const copy = {
  iphone: {
    p: 'Scan your iPhone for spyware, keyloggers and jailbreak tampering in just a few minutes. No technical knowledge needed.',
    c: [
      '4.8★ App Store',
      '1M+ iPhone scans',
      'Free scan'
    ],
    t: 'Is someone spying on your iPhone?'
  },

  android: {
    p: 'Check your Android for stalkerware, risky permissions and hidden tracking apps, then remove threats step by step.',
    c: [
      '4.6★ Google Play',
      '500K+ Android scans',
      'Free scan'
    ],
    t: 'Is someone spying on your Android?'
  }
};

function swap(el, text) {
  el.style.opacity = 0;

  setTimeout(() => {
    el.textContent = text;
    el.style.opacity = 1;
  }, 220);
}

$$('[data-platform]').forEach(button => {

  const label = $('span', button);
  const originalText = label.textContent;

  button.addEventListener('click', () => {

    const key = button.dataset.platform;
    const data = copy[key];

    swap(heroText, data.p);

    ['chip1', 'chip2', 'chip3'].forEach((id, index) => {
      $('#' + id).textContent = data.c[index];
    });
    swap($('#spyTitle'), data.t);
    $('#spySub').textContent =
      'Great choice! Starting your ' +
      (key === 'iphone' ? 'iPhone' : 'Android') +
      ' download...';
    label.textContent = '✓ Downloading...';

    button.classList.add('done');
    setTimeout(() => {
      label.textContent = originalText;
      button.classList.remove('done');
      $('#spySub').textContent = 'Find out with Certo';
    }, 2200);
  });
});

const track = $('#track');
const cards = $$('.card', track);
const dots = $('#dots');

cards.forEach((card, index) => {
  const dot = document.createElement('span');
  dot.onclick = () => go(index);
  dots.appendChild(dot);
});


let idx = 0;

function go(index) {

  idx = (index + cards.length) % cards.length;

  track.scrollTo({
    left:
      cards[idx].offsetLeft -
      cards[0].offsetLeft,
    behavior: 'smooth'
  });

  $$('span', dots).forEach((dot, index) => {
    dot.classList.toggle(
      'on',
      index === idx
    );
  });
}


$('#next').onclick = () => {
  go(idx + 1);
};
$('#prev').onclick = () => {
  go(idx - 1);
};

go(0);

let auto = setInterval(() => {
  go(idx + 1);
}, 5000);

track.addEventListener('mouseenter', () => {
  clearInterval(auto);
});

track.addEventListener('mouseleave', () => {
  auto = setInterval(() => {
    go(idx + 1);
  }, 5000);
});

const detail = $('#detail');

$$('.feat').forEach(feature => {
  feature.addEventListener('click', () => {
    $$('.feat').forEach(item => {
      item.classList.remove('active');
    });

    feature.classList.add('active');
    detail.style.opacity = 0;
    setTimeout(() => {
      detail.textContent =
        feature.dataset.t;
      detail.style.opacity = 1;
    }, 200);
  });
});

$('#storyBtn').onclick = event => {
  const span = $('span', event.currentTarget);
  span.textContent =
    span.textContent === 'About us'
      ? 'Founded to protect you'
      : 'About us';
};

$('#helpBtn').onclick = event => {
  const span = $('span', event.currentTarget);
  span.textContent =
    span.textContent === 'Visit help center'
      ? 'Opening help...'
      : 'Visit help center';
};

const more = $('#more');

let open = false;

more.onclick = () => {
  open = !open;
  $$('.post.extra').forEach(post => {

    post.classList.toggle(
      'show',
      open
    );
  });

  $('span', more).textContent =
    open
      ? 'Show less'
      : 'View all insights';

  $('i', more).textContent =
    open
      ? '↑'
      : '→';
};

$('#newsForm').addEventListener(
  'submit',
  event => {
    event.preventDefault();

    const form = event.currentTarget;
    const button = $('#newsBtn');
    const email = $('#email');

    button.textContent = 'Sending...';

    setTimeout(() => {

      form.classList.add('ok');
      $('#newsTitle').textContent =
        'Thank you for subscribing!';
      $('#newsText').textContent =
        'We sent a confirmation to ' +
        email.value +
        '. Stay safe out there.';
      button.textContent = 'Done ✓';
      email.value = '';
      setTimeout(() => {

        form.classList.remove('ok');
        $('#newsTitle').textContent =
          'Sign up to our newsletter';
        $('#newsText').textContent =
          'Receive the latest mobile security news, exclusive discounts & offers straight to your inbox!';

        button.textContent = 'Submit';
      }, 4000);
    }, 900);
  }
);

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('in');

        io.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

$$(
  'section h2,.panel,.mini-card,.post,.story-img,.news'
).forEach(element => {
  element.classList.add('rv');
  io.observe(element);
});