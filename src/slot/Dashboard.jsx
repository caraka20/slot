// src/Dashboard.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [activePlayers, setActivePlayers] = useState(3);
    const [profitIn, setProfitIn] = useState(500000000); // Dana Masuk
    const [profitOut, setProfitOut] = useState(200000000); // Dana Keluar
    const [winLimit, setWinLimit] = useState(20); // Default to 20x spin
    const [showPlayers, setShowPlayers] = useState(false);
    const [winningSpin, setWinningSpin] = useState({
        1: 20, // Default spin for Player 1
        2: 20, // Default spin for Player 2
        3: 20, // Default spin for Player 3
    });
    const [tempWinLimit, setTempWinLimit] = useState(winLimit); // Temporary state for win limit
    const [darkMode, setDarkMode] = useState(false); // State for dark mode

    // Contoh data pemain aktif
    const players = [
        { id: 1, name: "Player 1" },
        { id: 2, name: "Player 2" },
        { id: 3, name: "Player 3" },
    ];

    const handleWinLimitChange = (e) => {
        setTempWinLimit(e.target.value);
    };

    const confirmWinLimitChange = () => {
        Swal.fire({
            title: 'Konfirmasi Perubahan',
            text: `Apakah Anda yakin ingin mengatur kemenangan default menjadi ${tempWinLimit} untuk semua pemain?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                setWinLimit(tempWinLimit);
                
                // Update semua winningSpin jika winLimit diubah
                const updatedWinningSpin = {};
                players.forEach(player => {
                    updatedWinningSpin[player.id] = tempWinLimit;
                });
                setWinningSpin(updatedWinningSpin);
                Swal.fire(
                    'Pengaturan Berhasil!',
                    `Kemenangan default telah diatur menjadi ${tempWinLimit} untuk semua pemain.`,
                    'success'
                );
            }
        });
    };

    const togglePlayersList = () => {
        setShowPlayers(!showPlayers);
    };

    const handleWinningSpinChange = (id, e) => {
        const newValue = e.target.value;
        setWinningSpin({
            ...winningSpin,
            [id]: newValue
        });
    };

    const confirmWinningSpinChange = (id) => {
        const newValue = winningSpin[id]; // Ambil nilai saat ini
        Swal.fire({
            title: 'Konfirmasi Perubahan',
            text: `Apakah Anda yakin ingin mengatur kemenangan ${players.find(player => player.id === id).name} pada spin ke ${newValue}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Pengaturan Berhasil!',
                    `Atur kemenangan ${players.find(player => player.id === id).name} pada spin ke ${newValue}`,
                    'success'
                );
            }
        });
    };

    // Fungsi untuk memformat angka menjadi format rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(number);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Admin Slot</h1>
            <button
                className={`absolute top-4 right-4 bg-${darkMode ? 'blue-500' : 'gray-300'} hover:bg-${darkMode ? 'blue -600' : 'gray-400'} text-${darkMode ? 'white' : 'gray-800'} font-bold py-2 px-4 rounded`}
                onClick={toggleDarkMode}
            >
                { darkMode ? 'Matikan Mode Gelap' : 'Aktifkan Mode Gelap'}
            </button>
            <div className="grid grid-cols-2 gap-6">
                <div className={`bg-${darkMode ? 'gray-700' : 'green-200'} p-4 rounded shadow cursor-pointer`} onClick={togglePlayersList}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Player Aktif</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activePlayers}</p>
                </div>
                <div className={`bg-${darkMode ? 'gray-700' : 'blue-200'} p-4 rounded shadow`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dana Masuk</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatRupiah(profitIn)}</p>
                </div>
                <div className={`bg-${darkMode ? 'gray-700' : 'red-200'} p-4 rounded shadow`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dana Keluar</h2>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatRupiah(profitOut)}</p>
                </div>
                <div className={`bg-${darkMode ? 'gray-700' : 'white'} p-4 rounded shadow`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Atur Kemenangan</h2>
                    <input
                        type="number"
                        value ={tempWinLimit}
                        onChange={handleWinLimitChange}
                        className={`border border-${darkMode ? 'gray-600' : 'gray-300'} rounded p-2 mt-2 w-full ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}
                        placeholder="Masukkan jumlah kemenangan"
                    />
                    <button
                        className={`bg-${darkMode ? 'blue-500' : 'blue-500'} hover:bg-${darkMode ? 'blue-700' : 'blue-700'} text-white font-bold mt-2 py-2 px-4 rounded`}
                        onClick={confirmWinLimitChange}
                    >
                        Konfirmasi
                    </button>
                </div>
            </div>

            {showPlayers && (
                <div className={`mt-6 bg-${darkMode ? 'gray-700' : 'white'} p-4 rounded shadow`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daftar Pemain Aktif</h2>
                    <ul className="mt-2">
                        {players.map(player => (
                            <li key={player.id} className={`border-b py-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                <div className="flex justify-between items-center">
                                    <span className={`text-${darkMode ? 'white' : 'gray-900'}`}>{player.name}</span>
                                    <input
                                        type="number"
                                        value={winningSpin[player.id]}
                                        onChange={(e) => handleWinningSpinChange(player.id, e)}
                                        className={`border border-${darkMode ? 'gray-600' : 'gray-300'} rounded p-1 w-24 ${darkMode ? 'text-gray-900' : 'text-gray-900'}`}
                                        min="1"
                                        placeholder="Spin ke"
                                    />
                                    <button
                                        className={`bg-${darkMode ? 'blue-500' : 'blue-500'} hover:bg-${darkMode ? 'blue-700' : 'blue-700'} text-white font-bold py-2 px-4 rounded`}
                                        onClick={() => confirmWinningSpinChange(player.id)}
                                    >
                                        Konfirmasi
                                    </button>
                                </div>
                                <p className={`text-sm text-${darkMode ? 'gray-400' : 'gray-600'}`}>Menang pada spin ke: {winningSpin[player.id]}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;