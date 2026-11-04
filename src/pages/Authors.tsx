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
      <Hero headline="meet the authors" size="md" />
      <Container sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {authors.map((author) => (
            <Grid key={author.agentId}>
              <AuthorCard {...author} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Authors;
