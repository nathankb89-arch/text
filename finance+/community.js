 // Initialize posts array
        let posts = JSON.parse(localStorage.getItem('communityPosts')) || [];

        // Display message
        function showMessage(text, type) {
            const msgEl = document.getElementById('message');
            msgEl.textContent = text;
            msgEl.className = `message ${type}`;
            msgEl.style.display = 'block';
            setTimeout(() => msgEl.style.display = 'none', 3000);
        }

        // Handle form submission
        document.getElementById('postForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const post = {
                id: Date.now(),
                author: document.getElementById('authorName').value,
                category: document.getElementById('category').value,
                title: document.getElementById('title').value,
                content: document.getElementById('content').value,
                date: new Date().toLocaleDateString(),
                likes: 0
            };

            posts.unshift(post);
            localStorage.setItem('communityPosts', JSON.stringify(posts));

            document.getElementById('postForm').reset();
            renderPosts();
            updateStats();
            showMessage('Post shared successfully!', 'success');
        });

        // Render posts
        function renderPosts() {
            const feed = document.getElementById('postsFeed');
            const empty = document.getElementById('emptyState');

            if (posts.length === 0) {
                feed.innerHTML = '';
                empty.style.display = 'block';
                return;
            }

            empty.style.display = 'none';
            feed.innerHTML = posts.map(post => `
                <div class="post-item">
                    <div class="post-header">
                        <div>
                            <span class="post-category">${post.category}</span>
                            <div class="post-author">${post.author}</div>
                            <div class="post-date">${post.date}</div>
                        </div>
                        <button class="btn-danger btn-small" onclick="deletePost(${post.id})">Delete</button>
                    </div>
                    <h4>${post.title}</h4>
                    <div class="post-content">${post.content}</div>
                    <div class="post-actions">
                        <button class="btn btn-small" onclick="likePost(${post.id})">👍 Like (${post.likes})</button>
                        <button class="btn btn-small" onclick="sharePost(${post.id})">📤 Share</button>
                    </div>
                </div>
            `).join('');
        }

        // Like post
        function likePost(id) {
            const post = posts.find(p => p.id === id);
            if (post) {
                post.likes++;
                localStorage.setItem('communityPosts', JSON.stringify(posts));
                renderPosts();
            }
        }

        // Delete post
        function deletePost(id) {
            if (confirm('Are you sure you want to delete this post?')) {
                posts = posts.filter(p => p.id !== id);
                localStorage.setItem('communityPosts', JSON.stringify(posts));
                renderPosts();
                updateStats();
                showMessage('Post deleted', 'success');
            }
        }

        // Share post
        function sharePost(id) {
            const post = posts.find(p => p.id === id);
            if (post) {
                showMessage(`"${post.title}" shared! 🚀`, 'success');
            }
        }

        // Update statistics
        function updateStats() {
            document.getElementById('totalPosts').textContent = posts.length;
            document.getElementById('totalShares').textContent = posts.reduce((sum, p) => sum + p.likes, 0);
        }

        // Scroll to section
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        // Initialize
        renderPosts();
        updateStats();
              const postForm = document.getElementById('postForm');
        const postsFeed = document.getElementById('postsFeed');
        const totalPosts = document.getElementById('totalPosts');
        const totalShares = document.getElementById('totalShares');
        const emptyState = document.getElementById('emptyState');

        let posts = [];
        let sharesCount = 0;

        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const authorName = document.getElementById('authorName').value.trim();
            const category = document.getElementById('category').value;
            const title = document.getElementById('title').value.trim();
            const content = document.getElementById('content').value.trim();

            if (authorName && category && title && content) {
                const newPost = {
                    id: Date.now(), 
                    authorName,
                    category,
                    title,
                    content,
                    shares: 0
                };
                posts.unshift(newPost);
                renderPosts();  
                postForm.reset();
                totalPosts.textContent = posts.length;
            } else {
                alert('Please fill in all fields to create a post.');
            }
        });