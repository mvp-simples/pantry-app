import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Input from "@/src/componets/input";
import { useTranslation } from "react-i18next";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const theme = useTheme()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    return validateEmail(email) && validatePassword(password);
  };

  // Essas funções fazem a validação em tempo real:
  const handleEmailChange = (text: string) => {
    setEmail(text);

    if (text.length === 0) {
      setEmailError("Email é obrigatório.");
    } else if (!validateEmail(text)) {
      setEmailError("Por favor, insira um email válido.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    if (text.length === 0) {
      setPasswordError("Senha é obrigatória.");
    } else if (!validatePassword(text)) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Alert.alert("Erro", "Por favor, preencha os campos corretamente.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/(app)/(tabs)')
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_no_bg.png")}
        style={styles.logo}
      />

      <Text style={[{ color: theme.colors.secondary, ...styles.title }]}>Log in</Text>

      <Card style={[{ backgroundColor: theme.colors.surface, ...styles.card }]}>
        <Card.Content >
          <Input
            label={t("signin.email_label")}
            placeholder={t("signin.email_placeholder")}
            value={email}
            onChangeText={handleEmailChange} // agora validamos a cada digitação
            keyboardType="email-address"
            error={!!emailError}
            errorText={emailError}
          />

          <Input
            label={t("signin.password_label")}
            placeholder={t("signin.password_placeholder")}
            value={password}
            onChangeText={handlePasswordChange} // validando senha a cada digitação
            secureTextEntry
            error={!!passwordError}
            errorText={passwordError}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={!validateForm() || loading}
            style={[
              styles.button,
              (!validateForm() || loading) && styles.buttonDisabled,
            ]}
            contentStyle={styles.buttonContent}
            labelStyle={[
              styles.buttonLabel,
              (!validateForm() || loading) && styles.buttonLabelDisabled,
            ]}
          >
            {t("signin.submit_button")}
          </Button>
        </Card.Content>
      </Card>

      <View style={{ marginVertical: 10 }} />

      <Card style={[{ backgroundColor: theme.colors.surface, ...styles.card }]}>
        <Card.Content>
          <Button
            onPress={() => router.push("/register")}
            style={styles.link}
            labelStyle={styles.linkLabel}
            rippleColor="rgba(255,255,255,0.1)"
          >
            {t("signin.already_have_account")}{" "}
            <Text style={styles.linkHighlight}>{t("signin.signup")}</Text>
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {

  },
  container: {
    flex: 1,
    backgroundColor: "#13332E",
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    height: 100,
    width: 310,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#13332E",
    borderRadius: 12,
    elevation: 0,
    marginTop: 16
  },
  buttonDisabled: {
    opacity: 0.6,
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

export const options = {
  headerShown: false,
};