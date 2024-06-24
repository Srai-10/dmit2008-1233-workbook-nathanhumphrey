import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { QuoteManager } from '@/utils/quote-manager';

export default function Home() {
  const QUOTE_URL = 'https://api.quotable.io/random';

  const [randomQuote, setRandomQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [savedQuotes, setSavedQuotes] = useState(null);

  function getRandomQuote() {
    setRandomQuote(null);
    setIsLoading(true);

    // TODO: add this as a function in the quote manager
    fetch(QUOTE_URL)
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        // Now we have the quote object
        setRandomQuote({ author: json.author, quote: json.content });
      });
  }

  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1">Get You Some Quotes!</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="section">
        <Typography variant="h1">Random Quotes</Typography>
        <Box mt={4} mb={4}>
          <Button variant="contained" onClick={getRandomQuote}>
            Get a Quote
          </Button>
        </Box>
        <hr />
        <Box mt={4}>
          {isLoading && <LinearProgress />}
          {randomQuote && (
            <Box>
              <Typography variant="h2" mb={2}>
                A Random Quote
              </Typography>
              <Typography mb={2}>
                {randomQuote.quote} - {randomQuote.author}
              </Typography>
              <Button
                variant="contained"
                onClick={async () => {
                  randomQuote.id = (
                    await QuoteManager.saveQuote(randomQuote)
                  ).id;

                  // Now update the state
                  setRandomQuote({ ...randomQuote });
                  // Update the savedQuotes
                  setSavedQuotes([...savedQuotes, randomQuote]);
                }}
              >
                Save Quote
              </Button>
            </Box>
          )}
        </Box>
        <Box mt={4}>
          <Typography variant="h2">Previously Saved Quotes</Typography>
          <Button
            variant="contained"
            onClick={async () => {
              setSavedQuotes(await QuoteManager.getSavedQuotes());
            }}
          >
            Fetch Saved Quotes
          </Button>
          <List>
            {savedQuotes &&
              savedQuotes.map((q) => (
                <ListItem key={q.id}>
                  <ListItemText primary={q.quote} secondary={q.author} />
                </ListItem>
              ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
