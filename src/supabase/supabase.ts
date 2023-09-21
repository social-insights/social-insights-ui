import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qrvjjjgsxrciauibjpmq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydmpqamdzeHJjaWF1aWJqcG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUxNjIyMTcsImV4cCI6MjAxMDczODIxN30.7vnrn_PizYsnFvZY2OlKui7aZx1Ujpw2Afl7Yg0kCYo"
);
