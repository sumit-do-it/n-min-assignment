interface Starship {
  name: string;
  cost_in_credits: string;
}

interface StarshipsApiResponse {
  results: Starship[];
  status: number;
  statusText: string;
  next: string;
  previous: string;
  count: number;
}

export type { Starship, StarshipsApiResponse };
