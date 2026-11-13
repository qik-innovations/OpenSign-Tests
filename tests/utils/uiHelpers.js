const timeoutDefault = 5000;

module.exports = {
  closeTourIfShown: async function (page, timeout = timeoutDefault) {
    try {
      // Try common "Close Tour" button by role
      const closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
      await closeTourBtn.click({ timeout }).catch(() => {});
      return;
    } catch (e) {
      // fallback: try a close icon by aria-label or alternative labels
      try {
        // common close aria-label
        const closeIcon = page.getByRole('button', { name: '✕' }).first();
        await closeIcon.click({ timeout }).catch(() => {});
        return;
      } catch (e2) {
        // try button with text 'Close' (choose first to avoid strict ambiguity)
        try {
          await page.getByRole('button', { name: 'Close', exact: true }).first().click({ timeout }).catch(() => {});
          return;
        } catch (e3) {
          // Nothing to close — ignore
        }
      }
    }
  }
};
