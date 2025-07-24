# src/data_preparation.py

import os
import sys


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


import pandas as pd
from src import config

def load_data(train_path=config.TRAIN_DATA_PATH, test_path=config.TEST_DATA_PATH, target_column=config.TARGET_COLUMN):
    
    try:
        train_df = pd.read_csv(train_path)
        test_df = pd.read_csv(test_path)
    except FileNotFoundError as e:
        raise FileNotFoundError(f"Erreur lors du chargement des données: {e}. Vérifiez que les fichiers'{train_path}' and '{test_path}' exist.")
    except Exception as e:
        raise Exception(f"Une erreur est survenue lors de la lecture des fichiers CSV : {e}")

    if target_column not in train_df.columns:
        raise ValueError(f"Target column '{target_column}' not found in training data. Available columns: {train_df.columns.tolist()}")

    X_train = train_df.drop(columns=[target_column])
    y_train = train_df[target_column]

    # serparate test features and target if available
    X_test = test_df.drop(columns=[target_column]) if target_column in test_df.columns else test_df
    y_test = test_df[target_column] if target_column in test_df.columns else None

    print(f"Loaded data:")
    print(f"   X_train shape: {X_train.shape}")
    print(f"   y_train shape: {y_train.shape}")
    print(f"   X_test shape: {X_test.shape}")
    print(f"   y_test shape: {y_test.shape if y_test is not None else 'N/A'}")

    return X_train, y_train, X_test, y_test