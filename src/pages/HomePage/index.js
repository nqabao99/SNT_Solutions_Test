import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Controller, useForm } from "react-hook-form";
import ConsentForm from "./Consent";

const dataLang = {
  en: {
    content: `You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its entirety, you must not access or use the site or the site services.`,
    question: `Do you agree to this agreement ? Please respond by saying "Yes" or "No"`,
    result: ["yes", "no"],
    value: "en-US",
  },
  fr: {
    content: `Vous comprenez qu'en utilisant le site ou les services du site, vous acceptez d'être lié par cet accord. Si vous n'acceptez pas cet accord dans son intégralité, vous ne devez pas accéder ou utiliser le site ou les services du site.`,
    question: `Êtes-vous d'accord avec cet accord ? Veuillez répondre en disant "Oui" ou "Non"`,
    result: ["oui", "non"],
    value: "fr-FR",
  },
};

export default function HomePage() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { language: null },
  });

  const [isOpen, setIsOpen] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleData = ({ name, language }) => {
    setIsOpen({ name, language });
  };

  const defaultDataLang = dataLang[isOpen?.language?.value];

  const speak = (value) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const string = defaultDataLang?.content + defaultDataLang?.question;
    if (string) speak(string);
  }, [defaultDataLang]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" align="center">
          Consent Form
        </Typography>
      </Grid>
      {isOpen === null ? (
        <>
          <Grid item xs={12}>
            <TextField
              name="name"
              inputRef={register({
                required: true,
              })}
              error={!!errors?.name}
              helperText={
                errors?.name?.type === "required" ? "Name is required" : ""
              }
              label="Name"
              variant="outlined"
              placeholder="Enter your name"
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              render={(cProps) => (
                <Autocomplete
                  fullWidth
                  options={[
                    { label: "English", value: "en" },
                    { label: "French", value: "fr" },
                  ]}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  onChange={(e, data) => cProps.onChange(data)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Language"
                      placeholder="Select language"
                      error={!!errors?.language}
                      helperText={
                        errors?.language?.type === "required"
                          ? "Language is required"
                          : ""
                      }
                    />
                  )}
                />
              )}
              name="language"
              control={control}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              endIcon={<NavigateNextIcon />}
              onClick={handleSubmit(handleData)}
            >
              Next
            </Button>
          </Grid>
        </>
      ) : (
        <ConsentForm
          data={isOpen}
          defaultDataLang={defaultDataLang}
          isSpeaking={isSpeaking}
          speak={speak}
        />
      )}
    </Grid>
  );
}
