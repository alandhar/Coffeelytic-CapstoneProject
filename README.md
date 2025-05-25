# TUTORIAL PENGGUNAAN GIT UNTUK MASING-MASING **ROLE**

## Struktur Branch:

- `main` → versi stabil (untuk rilis)
- `dev` → integrasi semua fitur
- `fe` → cabang kerja tim frontend
- `be` → cabang kerja tim backend
- `ml` → cabang kerja tim machine learning
- `fe/form-input`, `be/api-product`, `ml/kmeans` → cabang kerja spesifik tiap fitur

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

Contoh:

```
git checkout -b fe/form-input
```

3. Kerjakan tugas → commit → push

Contoh:

```
git add .
git commit -m "feat: tambah form input produk"
git push -u origin fe/form-input
```

4. Ajukan Pull Request ke branch utama role

- `fe/form-input → fe`
- `be/api-product → be`
- `ml/kmeans → ml`

# Cara Mengecek dan Mengambil Update Terbaru

Sebelum memulai atau melanjutkan kerja, selalu pastikan kamu bekerja di versi terbaru dari branch yang kamu gunakan.

1. Cek Update Semua Branch dari Remote

```
git fetch
```

2. Ambil Update Terbaru di Branch Saat Ini
```
git pull origin <nama-branch>
```

> [!IMPORTANT]
> - Selalu perhatikan branch saat akan mengubah file atau mengembangkan fitur.
> - Selalu kerjakan dari branch role, bukan dev atau main
> - Buat branch baru untuk mengembangkan fitur masing-masing role.
> - Selalu `git fetch` lalu `git pull` sebelum kerja.
> - Setiap menyelesaikan fitur selalu lakukan 'Pull Request'.