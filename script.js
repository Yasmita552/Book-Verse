const titleInput = document.getElementById('bookTitle');
const authorInput = document.getElementById('bookAuthor');
const reviewInput = document.getElementById('bookReview');
const ratingInput = document.getElementById('bookRating');
const addBtn = document.getElementById('addBtn');
const reviewsList = document.getElementById('reviewsList');

document.addEventListener('DOMContentLoaded', loadReviews);
addBtn.addEventListener('click', addReview);

function addReview() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const review = reviewInput.value.trim();
  const rating = ratingInput.value;

  if (title === '' || author === '' || review === '') {
    alert('Please fill all fields!');
    return;
  }

  const reviewCard = createReviewCard(title, author, review, rating);
  reviewsList.appendChild(reviewCard);

  saveReview(title, author, review, rating);
  titleInput.value = '';
  authorInput.value = '';
  reviewInput.value = '';
}

function createReviewCard(title, author, review, rating) {
  const div = document.createElement('div');
  div.classList.add('review-card');

  const stars = '⭐'.repeat(rating);

  div.innerHTML = `
    <h3 class="review-title">${title}</h3>
    <p class="review-author">by ${author}</p>
    <p class="review-rating">${stars}</p>
    <p class="review-text">"${review}"</p>
    <button class="delete-btn">🗑 Delete</button>
  `;

  div.querySelector('.delete-btn').addEventListener('click', () => {
    div.remove();
    deleteReview(title);
  });

  return div;
}

function saveReview(title, author, review, rating) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push({ title, author, review, rating });
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach(r => {
    const reviewCard = createReviewCard(r.title, r.author, r.review, r.rating);
    reviewsList.appendChild(reviewCard);
  });
}

function deleteReview(title) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const updated = reviews.filter(r => r.title !== title);
  localStorage.setItem('reviews', JSON.stringify(updated));
}
