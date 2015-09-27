using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class IngredientTouchListener : AbstractTouchListener {

    public override void touchHandler()
    {
        Debug.Log("hey, i am ingredients");
    }
}
