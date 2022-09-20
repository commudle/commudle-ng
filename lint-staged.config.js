module.exports = {
  '{packages,tools}/**/*.{js,ts,json,md,html,css,scss}': [
    'nx affected --target lint --uncommitted --fix true --parallel',
    'nx affected --target test --uncommitted --parallel',
    'nx format:write --uncommitted',
  ],
};
