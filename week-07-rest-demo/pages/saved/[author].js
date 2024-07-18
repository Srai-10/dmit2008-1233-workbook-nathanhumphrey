import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
export default function QuotesByAuthor() {
    const router = useRouter();
    const { author } = router.query;

    return <p>Quotes By Author</p>;
}
import {
  Box,
  Container,
  List,
  ListItemText,
  Typography,
  ListItem,
} from '@mui/material';
import { QuoteManager } from '@/utils/quote-manager';
import NavBar from '@/components/NavBar';

export default function QuotesByAuthor() {
 // const QUOTE_URL = 'https://api.quotable.io/random';

 function toProperNameCase(name) {
  return name.split('-').map(word => word.charAt(0). toUpperCase() + word.substr(1)).join(' ');
 }

 const router = useRouter();
 const { author } = router.query;
 const [savedQuotes, setSavedQuotes] = useState(null);

 //Required on fresh page load to ensure the router.query object is ready
 const [isNameSet, setIsNameSet] = useState(false);

 //Once the router is ready, fetch quotes by the wildcat author
 //See: https://nextjs.org/docs/pages/api-reference/functions/use-router
 useEffect(() => {

  if (router.isReady) {
    QuoteManager.getSavedQuotesByAuthpr(toProperNameCase(author)). then((quotes) => {
      setSavedQuotes(quotes);
    });
    setIsNameSet(true);
  }

 }, [router.isReady]); //Run when router.isReady updates

  return (
    <Box component="main">
      <NavBar />
      <Container maxWidth="lg" component="section">
        <Typography variant="h1">Random Quotes</Typography>
        <Box mt={4}> 
        <Typography variant ="h2">Saved Quotes {isNameSet && `from ${toProperNameCase(author)}`}</Typography>
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