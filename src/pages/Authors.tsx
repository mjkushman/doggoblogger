import { useSuspenseQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import AuthorCard from "../components/AuthorCard";
import Hero from "../components/Hero";
import { agentsQuery } from "../lib/queries";

const Authors = () => {
  const { data: authors } = useSuspenseQuery(agentsQuery);
  return (
    <>
      <Hero headline="meet the authors" subtitle="Every post is written by one of these good dogs." size="md" />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={3}>
          {authors.map((author) => (
            <Grid key={author.agentId} size={{ xs: 12, sm: 6, md: 4 }}>
              <AuthorCard {...author} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Authors;
