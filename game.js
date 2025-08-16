class WordleUnlimited {
    constructor() {
        this.WORD_LENGTH = 5;
        this.MAX_GUESSES = 6;
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.targetWord = '';
        this.guesses = [];
        this.keyboardState = {};
        this.isSubmitting = false;
        this.lastSubmitTime = 0;
        this.submitCooldown = 1000; // 1 second cooldown between submissions
        
        this.loadWordLists()
            .then(() => {
                this.initializeGame();
                this.setupEventListeners();
                this.loadGameStats();
            })
            .catch(error => {
                console.error('Error loading word lists:', error);
                this.showError('Failed to load word lists. Please refresh the page.');
            });
    }

    async loadWordLists() {
        try {
            const [answersResponse, wordsResponse] = await Promise.all([
                fetch('wordle-answers-alphabetical.txt'),
                fetch('wordle-word-list.txt')
            ]);

            if (!answersResponse.ok || !wordsResponse.ok) {
                throw new Error('Failed to fetch word lists');
            }

            const answersText = await answersResponse.text();
            const wordsText = await wordsResponse.text();

            this.answerList = answersText.trim().split('\n').map(word => word.trim().toLowerCase());
            this.wordList = wordsText.trim().split('\n').map(word => word.trim().toLowerCase());

            // Combine both lists for validation, remove duplicates
            this.validWords = [...new Set([...this.answerList, ...this.wordList])];
            
            console.log(`Loaded ${this.answerList.length} answers and ${this.validWords.length} valid words`);
        } catch (error) {
            console.error('Error loading word lists:', error);
            // Fallback to a small set of words if files can't be loaded
            this.answerList = ['about', 'other', 'which', 'their', 'would', 'there', 'could', 'first', 'after', 'these'];
            this.validWords = this.answerList;
        }
    }

    initializeGame() {
        this.createGrid();
        this.selectRandomWord();
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.guesses = [];
        this.keyboardState = {};
        this.isSubmitting = false;
        this.updateKeyboardDisplay();
        this.easterEggSequence = [];
        this.setupEasterEggs();
        this.loadThemePreference();
    }
    
    loadThemePreference() {
        const savedTheme = localStorage.getItem('wordle-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('theme-toggle').textContent = '☀️';
        }
    }
    
    toggleTheme() {
        const body = document.body;
        const themeButton = document.getElementById('theme-toggle');
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            themeButton.textContent = '🌙';
            localStorage.setItem('wordle-theme', 'dark');
        } else {
            body.classList.add('light-theme');
            themeButton.textContent = '☀️';
            localStorage.setItem('wordle-theme', 'light');
        }
    }

    setupEasterEggs() {
        // Secret key sequence to find Timmy: T-I-M-M-Y
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            const key = e.key.toUpperCase();
            this.easterEggSequence.push(key);
            
            // Keep only last 5 keys
            if (this.easterEggSequence.length > 5) {
                this.easterEggSequence.shift();
            }
            
            // Check for TIMMY sequence
            if (this.easterEggSequence.join('') === 'TIMMY') {
                this.showTimmyDiscovery();
                this.easterEggSequence = []; // Reset
            }
        });
    }

    showTimmyDiscovery() {
        const messageEl = document.createElement('div');
        messageEl.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: linear-gradient(45deg, #b59f3b, #538d4e); color: white; 
                        padding: 2rem; border-radius: 12px; text-align: center; z-index: 2000;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.5); animation: bounceIn 0.8s;">
                <h2 style="margin: 0 0 1rem 0;">🎉 SECRET DISCOVERED! 🎉</h2>
                <p style="margin: 0 0 1rem 0;">You found the secret TIMMY code!</p>
                <button onclick="window.open('/timmy.html', '_blank'); this.parentElement.parentElement.remove();" 
                        style="background: white; color: #538d4e; border: none; padding: 0.75rem 1.5rem; 
                               border-radius: 6px; font-weight: bold; cursor: pointer; margin-right: 1rem;">
                    Meet Timmy! 🤓
                </button>
                <button onclick="this.parentElement.parentElement.remove();" 
                        style="background: transparent; color: white; border: 1px solid white; 
                               padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer;">
                    Later
                </button>
            </div>
        `;
        
        document.body.appendChild(messageEl);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (messageEl.parentElement) {
                messageEl.remove();
            }
        }, 10000);
    }

    createGrid() {
        const grid = document.getElementById('game-grid');
        grid.innerHTML = '';

        for (let row = 0; row < this.MAX_GUESSES; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            rowElement.id = `row-${row}`;

            for (let col = 0; col < this.WORD_LENGTH; col++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = `tile-${row}-${col}`;
                rowElement.appendChild(tile);
            }

            grid.appendChild(rowElement);
        }
    }

    selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.answerList.length);
        this.targetWord = this.answerList[randomIndex].toUpperCase();
        console.log('Target word:', this.targetWord); // Remove in production
    }

    setupEventListeners() {
        // Keyboard event listeners
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Virtual keyboard
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('click', () => {
                const keyValue = key.getAttribute('data-key');
                this.handleVirtualKey(keyValue);
            });
        });

        // Button event listeners
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('how-to-play').addEventListener('click', () => this.showModal('how-to-play-modal'));
        document.getElementById('stats').addEventListener('click', () => this.showStatsModal());
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Modal event listeners
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal').id);
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Game over modal buttons
        document.getElementById('play-again').addEventListener('click', () => {
            this.closeModal('game-over-modal');
            this.newGame();
        });

        document.getElementById('view-stats').addEventListener('click', () => {
            this.closeModal('game-over-modal');
            this.showStatsModal();
        });
    }

    handleKeyPress(e) {
        if (this.gameOver) return;

        const key = e.key.toUpperCase();

        if (key === 'ENTER') {
            e.preventDefault(); // Prevent default Enter behavior
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            e.preventDefault(); // Prevent default Backspace behavior
            this.deleteLetter();
        } else if (/^[A-Z]$/.test(key)) {
            this.addLetter(key);
        }
    }

    handleVirtualKey(key) {
        if (this.gameOver) return;

        if (key === 'Enter') {
            this.submitGuess();
        } else if (key === 'Backspace') {
            this.deleteLetter();
        } else {
            this.addLetter(key.toUpperCase());
        }
    }

    addLetter(letter) {
        if (this.currentCol < this.WORD_LENGTH) {
            const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
            tile.textContent = letter;
            tile.classList.add('filled');
            tile.classList.add('pop');
            
            setTimeout(() => tile.classList.remove('pop'), 100);
            
            this.currentCol++;
        }
    }

    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const tile = document.getElementById(`tile-${this.currentRow}-${this.currentCol}`);
            tile.textContent = '';
            tile.classList.remove('filled');
        }
    }

    async submitGuess() {
        // Prevent rapid submissions with cooldown
        const now = Date.now();
        if (now - this.lastSubmitTime < this.submitCooldown) {
            return;
        }
        
        if (this.isSubmitting) {
            return;
        }

        if (this.currentCol !== this.WORD_LENGTH) {
            this.showMessage('Not enough letters');
            this.shakeRow(this.currentRow);
            return;
        }

        const guess = this.getCurrentGuess().toUpperCase();
        
        if (!this.isValidWord(guess.toLowerCase())) {
            this.showMessage('Not in word list');
            this.shakeRow(this.currentRow);
            return;
        }

        this.isSubmitting = true;
        this.lastSubmitTime = Date.now(); // Update last submit time
        this.guesses.push(guess);
        await this.revealRow();
        this.updateKeyboardState(guess);
        this.updateKeyboardDisplay();

        if (guess === this.targetWord) {
            this.gameOver = true;
            this.updateStats(true, this.currentRow + 1);
            setTimeout(() => {
                this.showGameOverModal(true, this.currentRow + 1);
            }, 1500);
        } else if (this.currentRow === this.MAX_GUESSES - 1) {
            this.gameOver = true;
            this.updateStats(false, this.MAX_GUESSES + 1);
            setTimeout(() => {
                this.showGameOverModal(false, this.MAX_GUESSES + 1);
            }, 1500);
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }

        this.isSubmitting = false;
    }

    getCurrentGuess() {
        let guess = '';
        for (let col = 0; col < this.WORD_LENGTH; col++) {
            const tile = document.getElementById(`tile-${this.currentRow}-${col}`);
            guess += tile.textContent;
        }
        return guess;
    }

    isValidWord(word) {
        return this.validWords.includes(word);
    }

    async revealRow() {
        const guess = this.getCurrentGuess();
        const result = this.checkGuess(guess);

        for (let col = 0; col < this.WORD_LENGTH; col++) {
            const tile = document.getElementById(`tile-${this.currentRow}-${col}`);
            
            await new Promise(resolve => {
                setTimeout(() => {
                    tile.classList.add('flip');
                    
                    setTimeout(() => {
                        tile.classList.add(result[col]);
                        tile.classList.remove('flip');
                        resolve();
                    }, 300);
                }, col * 100);
            });
        }
    }

    checkGuess(guess) {
        const result = new Array(this.WORD_LENGTH).fill('absent');
        const targetArray = this.targetWord.split('');
        const guessArray = guess.split('');

        // First pass: mark correct letters
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (guessArray[i] === targetArray[i]) {
                result[i] = 'correct';
                targetArray[i] = null;
                guessArray[i] = null;
            }
        }

        // Second pass: mark present letters
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (guessArray[i] && targetArray.includes(guessArray[i])) {
                result[i] = 'present';
                targetArray[targetArray.indexOf(guessArray[i])] = null;
            }
        }

        return result;
    }

    updateKeyboardState(guess) {
        const result = this.checkGuess(guess);
        
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            const currentState = this.keyboardState[letter];
            const newState = result[i];

            // Priority: correct > present > absent
            if (!currentState || 
                (newState === 'correct') ||
                (newState === 'present' && currentState !== 'correct')) {
                this.keyboardState[letter] = newState;
            }
        }
    }

    updateKeyboardDisplay() {
        document.querySelectorAll('.key').forEach(key => {
            const letter = key.getAttribute('data-key');
            if (letter && letter.length === 1) {
                const state = this.keyboardState[letter.toUpperCase()];
                key.classList.remove('correct', 'present', 'absent');
                if (state) {
                    key.classList.add(state);
                }
            }
        });
    }

    shakeRow(rowIndex) {
        const row = document.getElementById(`row-${rowIndex}`);
        row.classList.add('shake');
        setTimeout(() => row.classList.remove('shake'), 500);
    }

    showMessage(message) {
        // Simple message display - could be enhanced with a toast notification
        console.log(message);
        
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            font-weight: bold;
        `;
        
        document.body.appendChild(messageEl);
        setTimeout(() => document.body.removeChild(messageEl), 2000);
    }

    newGame() {
        this.initializeGame();
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    showGameOverModal(won, guesses) {
        const modal = document.getElementById('game-over-modal');
        const title = document.getElementById('game-result-title');
        const message = document.getElementById('game-result-message');
        const wordReveal = document.getElementById('correct-word');

        if (won) {
            title.textContent = 'Congratulations!';
            message.innerHTML = `You guessed the word in ${guesses} ${guesses === 1 ? 'try' : 'tries'}!<br>
                <button onclick="game.shareResult()" class="btn" style="margin-top: 1rem; background-color: #538d4e;">
                    📱 Share Result
                </button>`;
        } else {
            title.textContent = 'Game Over';
            message.innerHTML = `Better luck next time!<br>
                <button onclick="game.shareResult()" class="btn" style="margin-top: 1rem; background-color: #818384;">
                    📱 Share Result
                </button>`;
        }

        wordReveal.textContent = this.targetWord;
        
        // Load word definition
        this.loadWordDefinition(this.targetWord.toLowerCase());
        
        this.showModal('game-over-modal');
    }

    shareResult() {
        const emojiGrid = this.generateEmojiGrid();
        const shareText = `Wordle Unlimited ${this.gameOver && this.guesses[this.guesses.length - 1] === this.targetWord ? this.guesses.length : 'X'}/6\n\n${emojiGrid}\n\nPlay at: wordleunlimited.cool`;
        
        if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
            navigator.share({
                title: 'Wordle Unlimited Result',
                text: shareText
            }).catch(err => {
                this.copyToClipboard(shareText);
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }

    generateEmojiGrid() {
        let grid = '';
        for (let i = 0; i < this.guesses.length; i++) {
            const guess = this.guesses[i];
            const result = this.checkGuess(guess);
            for (let j = 0; j < result.length; j++) {
                if (result[j] === 'correct') {
                    grid += '🟩';
                } else if (result[j] === 'present') {
                    grid += '🟨';
                } else {
                    grid += '⬜';
                }
            }
            grid += '\n';
        }
        return grid.trim();
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showMessage('Result copied to clipboard!');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            this.showMessage('Result copied to clipboard!');
        } catch (err) {
            this.showMessage('Failed to copy result');
        }
        document.body.removeChild(textArea);
    }

    async loadWordDefinition(word) {
        const loadingDiv = document.getElementById('definition-loading');
        const contentDiv = document.getElementById('definition-content');
        const errorDiv = document.getElementById('definition-error');
        const definitionText = document.getElementById('definition-text');

        // Reset display
        loadingDiv.style.display = 'block';
        contentDiv.style.display = 'none';
        errorDiv.style.display = 'none';

        try {
            // Using Free Dictionary API
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            
            if (!response.ok) {
                throw new Error('Definition not found');
            }

            const data = await response.json();
            const entry = data[0];
            
            // Get the first definition
            let definition = 'Definition not available';
            if (entry.meanings && entry.meanings.length > 0) {
                const meaning = entry.meanings[0];
                if (meaning.definitions && meaning.definitions.length > 0) {
                    definition = meaning.definitions[0].definition;
                    
                    // Add part of speech if available
                    if (meaning.partOfSpeech) {
                        definition = `(${meaning.partOfSpeech}) ${definition}`;
                    }
                }
            }

            definitionText.textContent = definition;
            loadingDiv.style.display = 'none';
            contentDiv.style.display = 'block';

        } catch (error) {
            console.log('Failed to load definition:', error);
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
        }
    }

    showStatsModal() {
        this.updateStatsDisplay();
        this.showModal('stats-modal');
    }

    loadGameStats() {
        const defaultStats = {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: [0, 0, 0, 0, 0, 0],
            averageGuesses: 0,
            lastPlayed: null,
            lastWord: null
        };

        const saved = localStorage.getItem('wordle-unlimited-stats');
        this.stats = saved ? JSON.parse(saved) : defaultStats;
    }

    updateStats(won, guesses) {
        this.stats.gamesPlayed++;
        this.stats.lastPlayed = new Date().toISOString();
        this.stats.lastWord = this.targetWord;
        
        if (won) {
            this.stats.gamesWon++;
            this.stats.currentStreak++;
            this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);
            this.stats.guessDistribution[guesses - 1]++;
            
            // Calculate average guesses
            const totalGuesses = this.stats.guessDistribution.reduce((sum, count, index) => {
                return sum + (count * (index + 1));
            }, 0);
            this.stats.averageGuesses = (totalGuesses / this.stats.gamesWon).toFixed(2);
        } else {
            this.stats.currentStreak = 0;
        }

        localStorage.setItem('wordle-unlimited-stats', JSON.stringify(this.stats));
    }

    updateStatsDisplay() {
        const winPercentage = this.stats.gamesPlayed > 0 
            ? Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) 
            : 0;

        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
        document.getElementById('win-percentage').textContent = winPercentage;
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
        document.getElementById('max-streak').textContent = this.stats.maxStreak;
        document.getElementById('avg-guesses').textContent = this.stats.averageGuesses || '-';

        this.updateDistributionChart();
    }

    updateDistributionChart() {
        const chartContainer = document.getElementById('distribution-chart');
        chartContainer.innerHTML = '';

        const maxCount = Math.max(...this.stats.guessDistribution, 1);

        for (let i = 0; i < 6; i++) {
            const count = this.stats.guessDistribution[i];
            const percentage = (count / maxCount) * 100;

            const bar = document.createElement('div');
            bar.className = 'distribution-bar';

            const label = document.createElement('div');
            label.className = 'distribution-label';
            label.textContent = i + 1;

            const fill = document.createElement('div');
            fill.className = 'distribution-fill';
            fill.style.width = `${Math.max(percentage, 7)}%`;
            fill.textContent = count;

            bar.appendChild(label);
            bar.appendChild(fill);
            chartContainer.appendChild(bar);
        }
    }

    showError(message) {
        this.showMessage(message);
    }
}

// Initialize the game when the page loads
let game; // Global game instance for share functionality
document.addEventListener('DOMContentLoaded', () => {
    game = new WordleUnlimited();
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch(registrationError => {
                console.log('Service Worker registration failed:', registrationError);
            });
    });
}