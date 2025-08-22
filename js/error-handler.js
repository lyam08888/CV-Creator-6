// Error handler for CV Creator
console.log('🔧 Error handler loaded');

// Global error handler
window.addEventListener('error', function(e) {
  console.error('❌ JavaScript Error:', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    error: e.error
  });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
  console.error('❌ Unhandled Promise Rejection:', e.reason);
});

// Module loading error handler
window.addEventListener('load', function() {
  console.log('✅ Page loaded successfully');
});

// Export for module usage
export function logError(message, error) {
  console.error('❌ ' + message, error);
}

export function logWarning(message) {
  console.warn('⚠️ ' + message);
}

export function logSuccess(message) {
  console.log('✅ ' + message);
}