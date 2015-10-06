using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class MineralTouchListener : AbstractTouchListener
{

    public override void touchHandler()
    {
        Debug.Log("hey, i am minerals");
    }
}
