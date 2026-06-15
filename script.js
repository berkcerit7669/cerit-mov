<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My Portfolio</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <nav class="desktop-nav">
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#work-grid">Work</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <nav class="mobile-menu" aria-hidden="true">
    <a href="#about">About</a>
    <a href="#work-grid">Work</a>
    <a href="#contact">Contact</a>
  </nav>

  <main>
    <!-- Other content -->

    <div class="work-grid work-grid-editorial" id="work-grid">
      <!-- Work items -->
    </div>

    <!-- Other content -->
  </main>

  <script src="script.js"></script>
</body>
</html>
  
/* Other CSS */

#work-grid {
  scroll-margin-top: 110px;
}

.work-grid-editorial {
  display: grid !important;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr) !important;
  gap: 18px !important;
  align-items: stretch !important;
}

/* Other CSS */
