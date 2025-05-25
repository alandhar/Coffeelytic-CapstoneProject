# TUTORIAL PENGGUNAAN GIT UNTUK MASING-MASING **ROLE**

## Struktur Branch:

`main` → versi stabil (untuk rilis)
`dev` → integrasi semua fitur
`fe` → cabang kerja tim frontend
`be` → cabang kerja tim backend
`ml` → cabang kerja tim machine learning
`fe/form-input`, `be/api-product`, `ml/kmeans` → cabang kerja spesifik tiap fitur

> [!NOTE]
> Branch fe, be, dan ml adalah induk untuk masing-masing role.
>
> Semua fitur dikembangkan di cabang baru yang berasal dari role masing-masing.

## Cara Kerja Tim

1. Clone Repo

```
git clone https://github.com/alandhar/Coffeelytic-CapstoneProject.git
cd Coffeelytic-CapstoneProject
```

2. Checkout ke branch role
    - Frontend Developer
    ```
    git checkout fe
    git pull origin fe
    ```

    - Backend Developer
    ```
    git checkout be
    git pull origin be
    ```

    - Machine Learning Engineer
    ```
    git checkout ml
    git pull origin ml
    ```


3. Buat branch kerja untuk fitur

```
git checkout -b fe/form-input
```

3. Kerjakan tugas → commit → push

```
git add .
git commit -m "feat: tambah form input produk"
git push -u origin fe/form-input
```

4. Ajukan Pull Request ke branch utama role

- `fe/form-input → fe`
- `be/api-product → be`
- `ml/kmeans → ml`

> [!IMPORTANT]
> - Selalu perhatikan branch saat akan mengubah file atau mengembangkan fitur.
> - Selalu kerjakan dari branch role, bukan dev atau main
> - Buat branch baru untuk mengembangkan fitur masing-masing role.
> - Setiap menyelesaikan fitur selalu lakukan 'Pull Request'.