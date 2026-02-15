document.addEventListener('DOMContentLoaded', () => {
    const commentToggleBtns = document.querySelectorAll('.comment-toggle-btn');

    commentToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const feedItem = btn.closest('.feed-item');
            const commentSection = feedItem.querySelector('.comment-section');
            if (commentSection.style.display === 'block') {
                commentSection.style.display = 'none';
            } else {
                commentSection.style.display = 'block';
            }
        });
    });

    const postBtn = document.getElementById('post-btn');
    const postModal = document.getElementById('post-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const submitPostBtn = document.getElementById('submit-post-btn');

    if(postBtn) {
        postBtn.addEventListener('click', () => {
            postModal.style.display = 'block';
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if(modal) {
                modal.style.display = 'none';
            }
        });
    });

    if(submitPostBtn) {
        submitPostBtn.addEventListener('click', () => {
            const postInput = document.getElementById('post-input').value;
            alert(`发布内容: ${postInput}`);
            postModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == postModal) {
            postModal.style.display = 'none';
        }
    });

    const backBtnHelp = document.getElementById('back-btn-help');
    const postBtnHelp = document.getElementById('post-btn-help');
    const postModalHelp = document.getElementById('post-modal-help');
    const closeBtnHelp = document.querySelector('.close-btn-help');
    const submitPostBtnHelp = document.getElementById('submit-post-btn-help');

    if (backBtnHelp) {
        backBtnHelp.addEventListener('click', () => {
            history.back();
        });
    }

    if (postBtnHelp) {
        postBtnHelp.addEventListener('click', () => {
            postModalHelp.style.display = 'block';
        });
    }

    if (closeBtnHelp) {
        closeBtnHelp.addEventListener('click', () => {
            postModalHelp.style.display = 'none';
        });
    }

    if (submitPostBtnHelp) {
        submitPostBtnHelp.addEventListener('click', () => {
            const postInputHelp = document.getElementById('post-input-help').value;
            if (postInputHelp.trim() !== '') {
                const feedContainer = document.querySelector('.feed-container');
                const newFeedItem = document.createElement('div');
                newFeedItem.classList.add('feed-item');
                newFeedItem.innerHTML = `
                    <div class="post-content">
                        <h3>你发布的内容</h3>
                        <p>${postInputHelp}</p>
                    </div>
                    <div class="actions-bar">
                        <button class="action-btn">点赞 0</button>
                        <button class="action-btn comment-toggle-btn">评论 0</button>
                        <button class="action-btn">收藏 0</button>
                    </div>
                    <div class="comment-section">
                        <div class="comment-input-container">
                            <textarea placeholder="输入你的评论..."></textarea>
                            <button>发布</button>
                        </div>
                    </div>
                `;
                feedContainer.insertBefore(newFeedItem, feedContainer.firstChild);
                
                // Re-add event listeners for the new comment section
                const newCommentForm = newFeedItem.querySelector('.comment-input-container');
                const newTextarea = newCommentForm.querySelector('textarea');
                const newButton = newCommentForm.querySelector('button');
                newButton.addEventListener('click', () => {
                    const commentText = newTextarea.value;
                    if (commentText.trim() !== '') {
                        const commentSection = newCommentForm.parentElement;
                        const newComment = document.createElement('div');
                        newComment.classList.add('comment');
                        newComment.innerHTML = `<p><strong>你:</strong> ${commentText}</p>`;
                        commentSection.insertBefore(newComment, newCommentForm);
                        newTextarea.value = '';
                    }
                });

                const newCommentToggleBtn = newFeedItem.querySelector('.comment-toggle-btn');
                newCommentToggleBtn.addEventListener('click', () => {
                    const commentSection = newFeedItem.querySelector('.comment-section');
                    if (commentSection.style.display === 'block') {
                        commentSection.style.display = 'none';
                    } else {
                        commentSection.style.display = 'block';
                    }
                });

                document.getElementById('post-input-help').value = '';
                postModalHelp.style.display = 'none';
            }
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == postModalHelp) {
            postModalHelp.style.display = 'none';
        }
    });

    const commentForms = document.querySelectorAll('.comment-input-container');
    commentForms.forEach(form => {
        const textarea = form.querySelector('textarea');
        const button = form.querySelector('button');
        button.addEventListener('click', () => {
            const commentText = textarea.value;
            if (commentText.trim() !== '') {
                const commentSection = form.parentElement;
                const newComment = document.createElement('div');
                newComment.classList.add('comment');
                newComment.innerHTML = `<p><strong>你:</strong> ${commentText}</p>`;
                commentSection.insertBefore(newComment, form);
                textarea.value = '';
            }
        });
    });
});