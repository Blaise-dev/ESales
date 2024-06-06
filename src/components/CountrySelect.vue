<script scoped></script>

<template>
  <v-select
    label="Pays"
    v-model="selectedCountry"
    :items="countries"
    item-value="code"
    item-title="name"
    :prepend-inner-icon="computedIcon"
    variant="outlined"
    density="compact"
  ></v-select>
</template>

<script>
export default {
  name: 'CountrySelect',
  data() {
    return {
      selectedCountry: null,
      countries: [
        { name: 'USA', code: 'US' },
        { name: 'France', code: 'FR' },
        { name: 'Allemagne', code: 'DE' },
        { name: 'Ukraine', code: 'UKR' },
        { name: 'Maroc', code: 'MA' },
        { name: 'Cameroun', code: 'CM' },
        { name: "Côte d'Ivoire", code: 'CI' },
        { name: 'Algérie', code: 'DZ' },
        { name: 'Tunisie', code: 'TN' },
        { name: 'Japon', code: 'JP' },
        { name: 'Corée du nord', code: 'KP' },
        { name: 'Corée du sud', code: 'KR' },
        { name: 'Portugal', code: 'PT' },
        { name: 'Espagne', code: 'ES' },
        { name: 'Sénégal', code: 'SN' },
        { name: 'Togo', code: 'TG' },
        { name: 'Bulgarie', code: 'BG' },
        { name: 'Bénin', code: 'BJ' },
        { name: 'Suisse', code: 'CH' },
        { name: 'Italie', code: 'IT' },
        { name: 'Argentine', code: 'AR' },
        { name: 'Belgique', code: 'BE' }
        // Ajoutez les autres pays ici
      ].sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  computed: {
    computedIcon() {
      return this.selectedCountry ? `fi fi-${this.selectedCountry.toLowerCase()}` : ''
    }
  }
}
</script>
