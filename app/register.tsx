import Input from "@/src/componets/input";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { View, StyleSheet, Image, TextInput as RNTextInput } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme()

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "name":
        if (value.trim().length === 0) {
          error = t("signup.errors.nameRequired");
        }
        break;
      case "email":
        if (value.trim().length === 0) {
          error = t("signup.errors.emailRequired");
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = t("signup.errors.emailInvalid");
        }
        break;
      case "password":
        if (value.length < 6) {
          error = t("signup.errors.passwordShort");
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          error = t("signup.errors.passwordMismatch");
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
    validateField(field, value);
  };

  const validateForm = () => {
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 6 &&
      confirmPassword === password
    );
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.replace("/login");
    }, 2000);
  };

  const isFormValid = () => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 6 &&
      confirmPassword === password
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_no_bg.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Sign up</Text>

      <Card style={[{ backgroundColor: theme.colors.surface }]}>
        <Card.Content>

          <Input
            label={t("signup.name")}
            placeholder={t("signup.namePlaceholder")}
            value={name}
            onChangeText={(text) => handleChange("name", text)}
            error={!!errors.name}
            errorText={errors.name}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />

          <Input
            label={t("signup.email")}
            placeholder={t("signup.emailPlaceholder")}
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            error={!!errors.email}
            errorText={errors.email}
            inputRef={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <Input
            label={t("signup.password")}
            placeholder={t("signup.passwordPlaceholder")}
            value={password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
            error={!!errors.password}
            errorText={errors.password}
            inputRef={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />

          <Input
            label={t("signup.confirmPassword")}
            placeholder={t("signup.confirmPasswordPlaceholder")}
            value={confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
            error={!!errors.confirmPassword}
            errorText={errors.confirmPassword}
            inputRef={confirmPasswordRef}
            returnKeyType="done"
            onSubmitEditing={handleSignUp}
          />

          <Button
            mode="contained"
            onPress={handleSignUp}
            style={[
              styles.button,
              (!isFormValid() || loading) && styles.buttonDisabled,
            ]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            disabled={!isFormValid() || loading}
            loading={loading}
          >
            {t("signup.button")}
          </Button>
        </Card.Content>
      </Card>

      <View style={{ marginVertical: 10 }} />

      <Card style={[{ backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Button
            onPress={() => router.back()}
            style={styles.link}
            labelStyle={styles.linkLabel}
            rippleColor="rgba(255,255,255,0.1)"
          >
            {t("signup.alreadyHaveAccount")} <Text style={styles.linkHighlight}>{t("signup.login")}</Text>
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13332E",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  logo: {
    height: 100,
    width: 310,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#13332E",
    borderRadius: 12,
    elevation: 0,
    marginTop: 16
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonContent: {
    paddingVertical: 10,
  },
  buttonLabel: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  buttonLabelDisabled: {
    color: "white",
  },
  link: {
    // marginTop: 24,
  },
  linkLabel: {
    textAlign: "center",
    color: "#13332E",
    fontSize: 14,
  },
  linkHighlight: {
    fontWeight: "bold",
    color: "#13332E",
    textDecorationLine: "underline",
  },
});
